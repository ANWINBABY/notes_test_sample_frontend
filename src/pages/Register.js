import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://notes-management-3rhb.onrender.com/api/register/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registered Successfully");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Registration Failed: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
      <button type="button" onClick={() => navigate("/login")}>
        Already have account? Login
      </button>
    </form>
  );
}

export default Register;
