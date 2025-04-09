import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Task from "../models/Task.js";

dotenv.config();

const deleteSeedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Getting the test user
    const testUser = await User.findOne({ email: "Johndoe@mail.com" });

    if (!testUser) {
      throw new Error("Test User not found");
    }

    // Delete all tasks associated with the test user
    await Task.deleteMany({ user: testUser._id });
    await User.deleteOne({ _id: testUser._id });
    console.log("✅ Seeded data deleted successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("🔥 Error deleting seeded data:", error);
    process.exit(1);
  }
};

deleteSeedData();
