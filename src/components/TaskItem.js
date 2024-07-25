import React, { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleUpdate = () => {
    onUpdate(task._id, {
      ...task,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
          className="w-full p-2 mb-2 border rounded">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="flex mt-2 gap-1">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <div className="flex mt-2 gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white p-2 rounded mr-2">
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white p-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
