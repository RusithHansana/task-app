import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT Token is not provided");

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc Register new user
//@route POST /api/auth/register
//@access Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) return res.status(400).json({ message: "Error creating user" });

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Login user
//@route POST /api/auth/login
//@access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "This user is not registered" });

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "MongoNetworkError" || error.code === "ETIMEDOUT") {
      return res
        .status(503)
        .json({ message: "Database connection error. Try again later." });
    }

    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Logout user
// @route POST /api/auth/logout
// @access Public
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
