import React, { useRef } from "react";
import axios from "axios";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section className="flex justify-center items-center h-screen">
      <div className="bg-gray-900/50 rounded-lg p-8 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="email" className="text-gray-100">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
            className="rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <label htmlFor="password" className="text-gray-100">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
            className="rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-md p-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Login;
