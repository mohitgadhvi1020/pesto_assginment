import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StatusFilter from "./components/StatusFilter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // TODO: Fetch tasks from API
  }, []);

  const addTask = (task) => {
    // TODO: Add task to API
    setTasks([...tasks, task]);
  };

  const updateTask = (id, updatedTask) => {
    // TODO: Update task in API
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    // TODO: Delete task from API
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <StatusFilter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
