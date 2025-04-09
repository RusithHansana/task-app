import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const getResetTime = (req) => {
  return Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
};

export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    console.warn(
      `Rate limit exceeded: IP=${req.ip}, Endpoint=${req.originalUrl}`
    );

    res.status(429).json({
      success: false,
      message: `Too many requests. Try again in ${getResetTime(req)} seconds`,
    });
  },
});
