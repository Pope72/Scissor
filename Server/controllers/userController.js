//Imports
import user from "../schemas/user.js";
import bcrypt from "bcryptjs";
import SignToken from "../utils/helpers/signToken.js";
import linkModel from "../schemas/link.js";
//Signup Controller
export const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Please fill all fields" });
    const userExists = await user.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ error: "Email already linked to another account" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await user.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ err: "Please fill all fields" });
    // Find user by email
    const userValid = await user.findOne({ email });
    if (!userValid) {
      return res.status(400).json({ err: "User not found" });
    }

    // Compare password with hashed password in database
    const passwordValid = await bcrypt.compare(password, userValid.password);
    if (!passwordValid) {
      return res.status(400).json({ err: "Invalid credentials" });
    }

    // Generate and send token
    SignToken(userValid._id, userValid.password, res);

    // Fetch user links
    const userLinks = await linkModel.find({ linkOwner: userValid._id });

    // Respond with user links
    res.status(200).json({ userLinks, userValid });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};
export const Logout = async (req, res) => {
  try {
    res.cookie("RefreshToken", "", { maxAge: 1 });
    res.cookie("AccessToken", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const verify = async (req, res) => {
  try {
    res.status(200).json({ message: "User verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
