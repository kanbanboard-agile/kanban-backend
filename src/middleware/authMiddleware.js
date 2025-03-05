import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: "Missing or invalid auth token",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
