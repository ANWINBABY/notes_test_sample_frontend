import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("register/", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
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
      <button type="button" onClick={() => navigate("/")}>
        Already have account? Login
      </button>
    </form>
  );
}

export default Register;
