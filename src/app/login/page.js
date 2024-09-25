"use client";
import ColorConstants from "../../constants/colors";
import { IoLogIn } from "react-icons/io5";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setCookie } from "cookies-next";

function Login() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  function handleInput(event) {
    const { name, value } = event.target; // Corrected to destructure from event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    validate(values);
    if (Object.keys(error).length === 0) {
      // API call logic goes here
      setValues({
        email: "",
        password: "",
      });
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    validate(values);

    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.post(
          'https://todo-server-l4cm.onrender.com/login', {
          email: values.email,
          password: values.password,
        });

        // Handle successful login (store token, redirect, etc.)
        console.log('Login successful:', response.data);
        // Example: Store token in local storage
        localStorage.setItem('token', response.data.token);
        // cookies().set('loggedIn',true);
        setCookie('loggedIn',true)
        // Redirect to dashboard or another page
        router.push('/');
      } catch (err) {
        // Handle errors
        setError({ api: 'Login failed. Please check your credentials.' });
        console.error(err);
      }
    }
  }

  function validate(values) {
    const newError = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.password === "") {
      newError.password = "Password is required.";
    } else if (values.password.length <= 7) {
      newError.password = "Password must be more than 7 characters.";
    }

    if (values.email === "") {
      newError.email = "Email is required.";
    } else if (!emailPattern.test(values.email)) {
      newError.email = "Enter a valid email.";
    }

    setError(newError);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <form className="w-2/5" onSubmit={submitHandler}>
      <div className="w-full flex flex-col gap-5 mb-5">
        <div>
          <input
            onChange={handleInput}
            name="email"
            type="email"
            value={values.email}
            style={{
              background: ColorConstants.secondaryBg,
              color: ColorConstants.primaryText,
              borderColor: ColorConstants.thirdBg,
            }}
            placeholder="Enter Email"
            className="p-3 w-full rounded-lg border-2 focus:border-yellow-400 focus:outline-none"
          />
          {error.email && (
            <p style={{ color: ColorConstants.highlet }}>{error.email}</p>
          )}
        </div>
  
        <div>
          <input
            onChange={handleInput}
            name="password"
            type="password"
            value={values.password}
            style={{
              background: ColorConstants.secondaryBg,
              color: ColorConstants.primaryText,
              borderColor: ColorConstants.thirdBg,
            }}
            placeholder="Password"
            className="p-3 w-full rounded-lg border-2 focus:border-yellow-400 focus:outline-none"
          />
          {error.password && (
            <p style={{ color: ColorConstants.highlet }}>{error.password}</p>
          )}
        </div>
      </div>
      
      {error.api && (
  <p style={{ color: ColorConstants.highlet }} className="mb-1">{error.api}</p>
)}

      <button
        type="submit"
        style={{
          background: ColorConstants.secondaryBg,
          color: ColorConstants.highlet,
          borderColor: ColorConstants.thirdBg,
        }}
        className="w-full flex flex-row justify-center space-x-2 items-center p-3 rounded-lg border-2 hover:bg-yellow-400 hover:text-white mb-2"
      >
        <IoLogIn className="w-5 h-5" />
        <p>Login</p>
      </button>
  
      <button
        type="button"
        onClick={() => router.push('/signup')}
        style={{
          color: ColorConstants.highlet,
        }}
        className="w-full mt-2"
      >
        <p className="text-center">Donot have an account? 
          <span className="font-bold"> Sign Up</span>
        </p>
      </button>
    </form>
  </div>
  
  );
}

export default Login;
