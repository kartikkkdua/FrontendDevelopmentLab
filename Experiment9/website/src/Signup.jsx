import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Mail, Lock } from "lucide-react";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("Password must be 8+ characters, include an uppercase letter, a number, and a symbol.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="text-center">
          <div className="icon-container">
            <Bot size={48} className="bot-icon" />
          </div>
          <h2 className="title">Sign Up</h2>
          <p className="subtitle">Create your account.</p>
        </div>

        <form onSubmit={handleSignup} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email address"
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Password"
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Confirm Password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
