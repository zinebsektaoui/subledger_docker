import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error on protectRoute.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied - Admins only" });
  }
  next();
};

export const validateRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });

      if (existingAdmin) {
        return res.status(403).json({
          message:
            "An admin already exists. The admin role can only be assigned once.",
        });
      }
    }

    next();
  } catch (error) {
    console.log("Error on validating role.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
