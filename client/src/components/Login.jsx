import React from "react";
import axios from "axios";
import Section from "./Section";
import { useNavigate } from "react-router-dom";
import FormInput from "../utilities/ValidateForms";

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

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
          <FormInput
            label="Email"
            type="email"
            id="email"
            required
            validator={(value) => /\S+@\S+\.\S+/.test(value)}
            errorMessage="Email ou senha incorretos."
            autoComplete="off"
          />
          <FormInput
            label="Senha"
            type="password"
            id="password"
            required
            validator={(value) => value.length >= 6}
            errorMessage="Email ou senha incorretos."
            autoComplete="off"
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
