import User from "../models/User.js";

export async function authenticateAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const admin = await User.findById(req.user._id);
    if (!admin.isAdmin) {
      return res.status(401).json({ error: "Admin access only" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server-side error occurred" });
  }
}
