import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-3xl font-bold text-center mb-5">Task Manager</h1>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-5">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                localStorage.getItem("token") ? (
                  <TaskManager />
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
