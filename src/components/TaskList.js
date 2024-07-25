import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
