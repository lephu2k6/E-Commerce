import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"] || "";
    const parts = header.split(" ");
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
    if (!token) return res.status(401).json({ success: false, message: "Thiếu token" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
};

