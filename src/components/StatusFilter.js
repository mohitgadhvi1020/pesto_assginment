import React from "react";

function StatusFilter({ filter, setFilter }) {
  return (
    <div className="mb-5">
      <label htmlFor="status-select" className="block text-gray-700 mb-2">
        Filter by status:
      </label>
      <select
        id="status-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border rounded">
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default StatusFilter;
