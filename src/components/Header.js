import React from "react";
import { Link } from "react-router-dom";
import { generateAvatar } from "../utills/generateAvatar";

function Header({ user }) {
  return (
    <header className="bg-orange-300 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div className="flex items-center">
          <generateAvatar name={user?.username} />
          <Link to="/profile" className="text-white hover:underline">
            {user?.username}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
