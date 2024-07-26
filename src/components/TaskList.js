import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import api from "../utills/api";

function TaskList({ tasks, onUpdateTask, onDeleteTask, onFetchTasks }) {
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onFetchTasks(sortBy, sortOrder, searchTerm);
  }, [sortBy, sortOrder, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="mb-4 flex md:flex-row flex-col md:space-x-4 space-y-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-2 py-1 border rounded"
        />
        <select
          value={sortBy}
          onChange={handleSort}
          className="px-2 py-1 border rounded">
          <option value="title">Title</option>
          <option value="status">Status</option>
          <option value="dueDate">Due Date</option>
        </select>
        <button onClick={handleSortOrder} className="px-2 py-1 border rounded">
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
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
    </div>
  );
}

export default TaskList;
