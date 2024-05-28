import React, { useState } from "react";
import axios from "axios";
import Section from "./Section";
import { useNavigate } from "react-router-dom"; 


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/registrar", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Registration successful!");
        navigate("/login"); 
      } else {
        console.error("Registration failed:", response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section className="flex justify-center items-center h-screen">
      <div className="bg-gray-900/50 rounded-lg p-8 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="username" className="text-gray-100">
            Nome:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <label htmlFor="email" className="text-gray-100">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <label htmlFor="password" className="text-gray-100">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-md p-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar conta
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Register;