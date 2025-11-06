import validator from "validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";

export async function register(req, res) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(401).json({ error: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(401)
        .json({ error: "Password must be at least 8 characters long" });
    }
    if (!validator.isEmail(email)) {
      return res.status(401).json({ error: "Invalid email address" });
    }

    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ error: "Password and confirmation do not match" });
    }

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(401).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id.toString());

    return res.status(201).json({
      success: "Account created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while creating account" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateToken(user._id.toString());
    return res.status(200).json({
      success: "Logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error occurred during login" });
  }
}

export async function me(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error fetching your data" });
  }
}
