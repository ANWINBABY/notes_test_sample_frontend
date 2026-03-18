import React, { useState } from "react";
import axios from "axios"; // use axios directly
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure you send the payload as JSON
      const res = await axios.post(
        "https://notes-management-3rhb.onrender.com/api/login/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.access);

      // Navigate to protected page
      navigate("/notes");
    } catch (err) {
      console.error(err);
      alert("Login Failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login page</h1>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <button type="submit">Login</button>

      {/* Add type="button" to prevent submitting form */}
      <button type="button" onClick={() => navigate("/register")}>
        New User? Register
      </button>
    </form>
  );
}

export default Login;
