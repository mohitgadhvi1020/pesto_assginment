// components/TaskManager.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import StatusFilter from "./StatusFilter";
import api from "../utills/api";
import Header from "./Header";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const [userResponse, tasksResponse] = await Promise.all([
          api.get("/users/profile"),
          api.get("/tasks"),
        ]);
        setUser(userResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching user data and tasks:", error);
        // Handle error, possibly redirect to login if unauthorized
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };
    fetchUserAndTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await api.post("/tasks", task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchTasks = async (sortBy, sortOrder, searchTerm) => {
    try {
      const response = await api.get("/tasks", {
        params: {
          sort: sortBy,
          order: sortOrder,
          search: searchTerm,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-4 mt-8">
        <TaskForm onSubmit={addTask} />
        <StatusFilter filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onFetchTasks={fetchTasks}
        />
      </div>
    </div>
  );
}

export default TaskManager;
