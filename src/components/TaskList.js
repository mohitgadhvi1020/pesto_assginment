import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
