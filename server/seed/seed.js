import dotenv from "dotenv";
import User from "../models/User.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();

    // Create a sample user
    const user = await User.create({
      name: "John Doe",
      email: "Johndoe@mail.com",
      password: "password123",
    });

    if (!user) {
      throw new Error("User creation failed");
    }
    // Create sample tasks
    const tasks = [
      { title: "Learn MERN Stack", user: user._id },
      { title: "Build Task Manager", user: user._id, completed: true },
      {
        title: "Deploy to Production",
        user: user._id,
        description: "Use AWS or Heroku",
      },
    ];

    const createdTasks = await Task.insertMany(tasks);

    if (!createdTasks) {
      throw new Error("Task creation failed");
    }

    console.log("🌱 Database seeded successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("🔥 Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
