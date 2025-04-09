import Task from "../models/Task.js";

//@desc Get all tasks
//@route GET /api/tasks
//@access Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error while getting tasks" });
  }
};

//@desc Create new task
//@route POST /api/tasks
//@access Private
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error while creating task" });
  }
};

//@desc Update task
//@route PUT /api/tasks/:id
//@access Private
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        description,
        completed,
      },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error while updating task" });
  }
};

//@desc Delete task
//@route DELETE /api/tasks/:id
//@access Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error while deleting task" });
  }
};
