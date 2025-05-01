import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, LogOut, User } from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/signup"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/signup");
  };

  return (
    <div className="dashboard-container">
      <div className="blurred-circle top-right" />
      <div className="blurred-circle bottom-left" />

      <div className="dashboard-box">
        <div className="text-center">
          <div className="icon-container">
            <Bot size={48} className="bot-icon" />
          </div>
          <h2 className="title">Welcome to Your Dashboard</h2>
          <p className="subtitle">Manage your account and explore features</p>
        </div>

        {user ? (
          <div className="user-details">
            <User size={40} className="user-icon" />
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
            <p className="user-role">Role: {user.role}</p>
          </div>
        ) : (
          <p className="loading-text">Loading user details...</p>
        )}

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} className="logout-icon" />
          Logout
        </button>
      </div>
    </div>
  );
}
