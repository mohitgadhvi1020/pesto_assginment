const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

/**
 * @desc    Get all tasks for the authenticated user with sorting, filtering, and searching
 * @route   GET /api/tasks
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    let query = { user: req.user._id };
    let sort = {};

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by due date range
    if (req.query.startDate && req.query.endDate) {
      query.dueDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    // Sorting
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    const tasks = await Task.find(query).sort(sort);

    // Add reminder information to each task
    const tasksWithReminders = tasks.map((task) => {
      const now = new Date();
      const dueDate = new Date(task.dueDate);
      const timeDiff = dueDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log("daysDiff", daysDiff);

      let reminder = null;
      if (daysDiff <= 0) {
        reminder = "This task is overdue!";
      } else if (daysDiff === 1) {
        reminder = "This task is due tomorrow!";
      } else if (daysDiff <= 3) {
        reminder = `This task is due in ${daysDiff} days.`;
      }

      return {
        ...task.toObject(),
        reminder,
      };
    });
    console.log("tasksWithReminders", tasksWithReminders);
    res.json(tasksWithReminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Create a new task for the authenticated user
 * @route   POST /api/tasks
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    user: req.user._id,
    dueDate: req.body.dueDate,
    reminderDate: req.body.reminderDate,
    createdAt: new Date(),
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @desc    Update a task for the authenticated user
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
router.put("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updates = [
      "title",
      "description",
      "status",
      "dueDate",
      "reminderDate",
    ];
    updates.forEach((update) => {
      if (req.body[update] != null) {
        task[update] = req.body[update];
      }
    });

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @desc    Delete a task for the authenticated user
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... (keep the GET /:id and DELETE /:id routes as they were)

module.exports = router;
