import React from "react";

function StatusFilter({ filter, setFilter }) {
  return (
    <div className="status-filter">
      <label htmlFor="status-select">Filter by status:</label>
      <select
        id="status-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default StatusFilter;
