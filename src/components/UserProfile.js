// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import api from "../utills/api";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/users/profile", { username, email });
      setUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        {/* <img
          src={user.avatarUrl || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <input
          type="file"
          onChange={handleAvatarUpload}
          className="mt-2"
          accept="image/*"
        /> */}
      </div>
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-300 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
