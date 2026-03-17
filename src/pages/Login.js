import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("login/", form);
    localStorage.setItem("token", res.data.access);
    navigate("/notes");
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Login page</h1>
      <input placeholder="Username" onChange={(e)=>setForm({...form, username:e.target.value})} />
      <br></br>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})} />
      <br></br>
      <button>Login</button>

      <button onClick={() => navigate("/register")}>
        New User? Register
      </button>
    </form>
  );
}

export default Login;