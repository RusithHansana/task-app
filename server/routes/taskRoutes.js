import express from "express";
import { body } from "express-validator";
import { protect } from "../Middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(
    [
      body("title").not().isEmpty().withMessage("Title is required"),
      body("description").optional(),
    ],
    createTask
  );

router
  .route("/:id")
  .put(
    [
      body("title").optional(),
      body("description").optional(),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean"),
    ],
    updateTask
  )
  .delete(deleteTask);

export default router;
