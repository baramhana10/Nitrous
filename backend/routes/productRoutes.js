import express from "express";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import Product from "../models/Product.js";

const router = express.Router();

// Cloudflare R2 Config
const r2KeyId = process.env.R2_ACCESS_KEY_ID;
const r2Secret = process.env.R2_SECRET_ACCESS_KEY;
const r2Bucket = process.env.R2_BUCKET_NAME;
const r2AccountId = process.env.R2_ACCOUNT_ID;

// Check if R2 is configured
const isR2Configured =
  r2KeyId &&
  r2Secret &&
  r2Bucket &&
  r2AccountId &&
  r2KeyId !== "your_access_key" &&
  r2Secret !== "your_secret_key";

let s3Client = null;
if (isR2Configured) {
  try {
    s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2KeyId,
        secretAccessKey: r2Secret,
      },
    });
    console.log("R2 client initialized successfully");
  } catch (error) {
    console.error("Failed to initialize R2 client:", error);
  }
} else {
  console.log("R2 not configured, will use local storage for images");
}

// Multer Config - Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Product
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const {
      name,
      tagline,
      price,
      category,
      categoryName,
      specs,
      features,
      badge,
      tags,
      quantity,
    } = req.body;

    let parsedSpecs = specs;
    if (typeof specs === "string") {
      try {
        parsedSpecs = JSON.parse(specs);
      } catch (e) {}
    }

    let parsedFeatures = features;
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {}
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      if (isR2Configured && s3Client) {
        // Upload to R2
        for (const file of req.files) {
          const filename = `${Date.now()}-${file.originalname}`;
          try {
            const uploadParams = {
              Bucket: r2Bucket,
              Key: filename,
              Body: file.buffer,
              ContentType: file.mimetype,
            };

            const parallelUploads3 = new Upload({
              client: s3Client,
              params: uploadParams,
            });

            await parallelUploads3.done();

            const publicDomain = process.env.R2_PUBLIC_DOMAIN;
            if (
              publicDomain &&
              publicDomain !== "https://your-custom-domain.com"
            ) {
              imageUrls.push(`${publicDomain}/${filename}`);
            } else {
              imageUrls.push(`https://${r2Bucket}.r2.dev/${filename}`);
            }
          } catch (uploadError) {
            console.error("R2 Upload Error:", uploadError);
          }
        }
      } else {
        // R2 not configured - save to local uploads folder
        const fs = await import("fs/promises");
        const path = await import("path");
        const { fileURLToPath } = await import("url");

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadsDir = path.join(__dirname, "..", "uploads");

        try {
          await fs.access(uploadsDir);
        } catch {
          await fs.mkdir(uploadsDir, { recursive: true });
        }

        for (const file of req.files) {
          const filename = `${Date.now()}-${file.originalname}`;
          const filepath = path.join(uploadsDir, filename);
          await fs.writeFile(filepath, file.buffer);
          imageUrls.push(`/uploads/${filename}`);
        }
      }
    }

    const product = new Product({
      name,
      tagline,
      price,
      category,
      categoryName,
      images: imageUrls,
      specs: parsedSpecs,
      features: parsedFeatures,
      badge,
      tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
      quantity: quantity !== undefined && quantity !== "" ? Number(quantity) : null,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update Product
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    console.log("Updating product ID:", req.params.id);
    console.log("Request Body keys:", Object.keys(req.body));

    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log("Product not found with ID:", req.params.id);
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      tagline,
      price,
      category,
      categoryName,
      specs,
      features,
      badge,
      tags,
      quantity,
      existingImages,
      hasExistingImages,
    } = req.body;

    if (name !== undefined) product.name = name;
    if (tagline !== undefined) product.tagline = tagline;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (categoryName !== undefined) product.categoryName = categoryName;
    if (badge !== undefined) product.badge = badge;
    if (quantity !== undefined) product.quantity = quantity === "" ? null : Number(quantity);
    if (tags !== undefined) {
      product.tags = tags
        ? Array.isArray(tags)
          ? tags
          : JSON.parse(tags)
        : [];
      product.markModified("tags");
    }

    if (specs) {
      let parsedSpecs = specs;
      if (typeof specs === "string") {
        try {
          parsedSpecs = JSON.parse(specs);
        } catch (e) {
          console.error("Specs parse error:", e);
        }
      }
      product.specs = parsedSpecs;
      product.markModified("specs");
    }

    if (features) {
      let parsedFeatures = features;
      if (typeof features === "string") {
        try {
          parsedFeatures = JSON.parse(features);
        } catch (e) {
          console.error("Features parse error:", e);
        }
      }
      product.features = parsedFeatures;
      product.markModified("features");
    }

    // Handle Images
    let updatedImages = [];

    // 1. Keep existing images requested by frontend
    if (hasExistingImages === "true") {
      if (existingImages) {
        if (Array.isArray(existingImages)) {
          updatedImages = existingImages;
        } else {
          updatedImages = [existingImages];
        }
      }
      // if hasExistingImages is true but existingImages is missing/undefined,
      // it means the array is intended to be empty.
    } else {
      // Default: if no flag, keep current images (safety)
      updatedImages = [...product.images];
    }

    // 2. Add new uploaded images
    if (req.files && req.files.length > 0) {
      console.log(`Processing ${req.files.length} new files`);

      if (isR2Configured && s3Client) {
        // Upload to R2
        for (const file of req.files) {
          const filename = `${Date.now()}-${file.originalname}`;
          try {
            const uploadParams = {
              Bucket: r2Bucket,
              Key: filename,
              Body: file.buffer,
              ContentType: file.mimetype,
            };
            const parallelUploads3 = new Upload({
              client: s3Client,
              params: uploadParams,
            });
            await parallelUploads3.done();

            const publicDomain = process.env.R2_PUBLIC_DOMAIN;
            if (
              publicDomain &&
              publicDomain !== "https://your-custom-domain.com"
            ) {
              updatedImages.push(`${publicDomain}/${filename}`);
            } else {
              updatedImages.push(`https://${r2Bucket}.r2.dev/${filename}`);
            }
          } catch (uploadError) {
            console.error("R2 Upload Error:", uploadError);
          }
        }
      } else {
        // R2 not configured - save to local uploads folder
        const fs = await import("fs/promises");
        const path = await import("path");
        const { fileURLToPath } = await import("url");

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadsDir = path.join(__dirname, "..", "uploads");

        // Ensure uploads directory exists
        try {
          await fs.access(uploadsDir);
        } catch {
          await fs.mkdir(uploadsDir, { recursive: true });
        }

        for (const file of req.files) {
          const filename = `${Date.now()}-${file.originalname}`;
          const filepath = path.join(uploadsDir, filename);
          await fs.writeFile(filepath, file.buffer);
          updatedImages.push(`/uploads/${filename}`);
        }
      }
    }

    product.images = updatedImages;
    product.markModified("images");

    const updatedProduct = await product.save();
    console.log("Product updated successfully:", updatedProduct._id);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.errors });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
