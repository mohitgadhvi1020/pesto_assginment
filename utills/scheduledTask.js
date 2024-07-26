// scheduledTasks.js
const cron = require("node-cron");
const Task = require("./models/Task");
const User = require("./models/User"); // Assuming you have a User model
const sendEmail = require("./utils/sendEmail"); // You'll need to implement this

const startScheduledTasks = () => {
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    console.log("Running task reminder check...");
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    try {
      const tasksToRemind = await Task.find({
        reminderDate: { $gte: now, $lt: oneHourFromNow },
      }).populate("user");

      for (let task of tasksToRemind) {
        if (task.user && task.user.email) {
          await sendEmail(
            task.user.email,
            "Task Reminder",
            `Your task "${task.title}" is due soon!`
          );
          console.log(`Reminder sent for task: ${task.title}`);
        }
      }
    } catch (error) {
      console.error("Error in reminder cron job:", error);
    }
  });
};

module.exports = startScheduledTasks;
