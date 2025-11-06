import User from "../models/User.js";
import bcrypt from "bcryptjs";

export async function createDefaultAdmin(req , res) {
  const admin = await User.findOne({ email: "admin@admin.com" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 14);
    if(!hashedPassword){
      return res.status(401).json({error: "كلمة مرور خاطئة"})
    }
    await User.create({
      username: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      isAdmin: true,
    });
  }
}
