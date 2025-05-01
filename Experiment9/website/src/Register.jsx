import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain a lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain a number.");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain a special character (!@#$%^&*).");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setError(errors);
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registration successful!");
    navigate("/login"); 
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error.length > 0 && (
          <div className="error">
            {error.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
