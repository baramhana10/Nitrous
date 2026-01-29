    import express from "express";
    import mongoose from "mongoose";
    import cors from "cors";
    import "dotenv/config";
    import userRoutes from "./routes/userRoutes.js";

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/users", userRoutes);

    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

    app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    });