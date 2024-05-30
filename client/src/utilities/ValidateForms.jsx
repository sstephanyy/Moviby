import React, { useState, useRef } from "react";

const FormInput = ({ label, type, id, required, validator, errorMessage, autoComplete }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();

  const validate = () => {
    const value = inputRef.current.value;
    if (required && !value) {
      setError(`${label} é obrigatório.`);
    } else if (validator && !validator(value)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-gray-100">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        ref={inputRef}
        required={required}
        className={`rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${error ? "border-red-500" : ""}`}
        autoComplete={autoComplete}
        onBlur={validate}
        onChange={() => setError("")}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FormInput;
