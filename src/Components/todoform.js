"use client"
import React, { useState } from "react";
import ColorConstants from "../constants/colors";
import { FaPlus } from "react-icons/fa6";

function Todoform({onAddTask}) {
    const [title, setTitle] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (title.trim() === '') return; // Prevent adding empty tasks
    
        const newTask = {
          title,
          status: "in progress", // Default status
        };
        
        setTitle('');
        onAddTask(newTask); // Call the function to add the task
      };
  
  return (
    <form className="mb-5 w-full " onSubmit={handleSubmit}>
      <input
         onChange={(e) => setTitle(e.target.value)}
        value={title}
        name="todo"
        style={{
          background: ColorConstants.secondaryBg,
          color: ColorConstants.primaryText,
          borderColor: ColorConstants.thirdBg,
        }}
        placeholder="What needa to be done?"
        className="p-3 w-full rounded-lg border-2 focus:border-yellow-400 focus:outline-none mb-2"
      />

      <button
        type="submit"
        style={{
          background: ColorConstants.secondaryBg,
          color: ColorConstants.highlet,
          borderColor: ColorConstants.thirdBg,
        }}
        className="flex flex-row space-x-2 items-center p-3 rounded-lg border-2 hover:bg-yellow-400 hover:text-white"
      >
        <FaPlus className="w-5 h-5" />
        <p>Add Todo</p>
      </button>
    </form>
  );
}

export default Todoform;
