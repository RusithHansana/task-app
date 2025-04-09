import express from "express";
import { body } from "express-validator";
import { protect } from "../Middleware/authMiddleware.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.use(protect);

router
  .route("/update/:id")
  .put(
    [
      body("name").not().isEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid Email is required"),
    ],
    updateUser
  );

export default router;
