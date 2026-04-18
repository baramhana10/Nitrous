import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

const seedAdmin = async () => {
  try {
    // Get email and password from environment variables or use defaults
    const adminEmail = process.env.ADMIN_EMAIL || "admin@nitrous.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "adminNitrous123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existingAdmin) {
      console.log(`✅ Admin account exists for: ${adminEmail}`);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin
    const admin = new Admin({
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin account created successfully");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("   ⚠️  IMPORTANT: Change these credentials in production!");
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default seedAdmin;
