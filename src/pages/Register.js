import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("register/", form);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e)=>setForm({...form, username:e.target.value})} />
      <br></br>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})} />
      <br></br>
      <button>Register</button>

      <button onClick={() => navigate("/")}>
        Already have account? Login
      </button>
    </form>
  );
}

export default Register;