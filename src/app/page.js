"use client";
import React, { useState, useEffect } from 'react';
import Todoform from '../Components/todoform';
import Todolist from '../Components/todolist';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      try {
        const res = await axios.get(
          "https://todo-server-l4cm.onrender.com/todos", {
            headers: {
              'Authorization': `Bearer ${token}`, // Set the Authorization header
              'Content-Type': 'application/json',
            }
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err.response ? err.response.data : err.message);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once on component mount

  // Add a new task
  const addTask = async (newTask) => {
    console.log(newTask)
    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      const res = await axios.post(
        'https://todo-server-l4cm.onrender.com/todos', newTask, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token in the header
          }
        });
      console.log(res)
      setTasks((prevTasks) => [...prevTasks, newTask]); // Use the response data
    } catch (err) {
      console.error('Error adding task:', err.response ? err.response.data : err.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      await axios.delete(`https://todo-server-l4cm.onrender.com/todos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token in the header
        }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err.response ? err.response.data : err.message);
    }
  };

  // Update a task
  const updateTask = async (updatedTask) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      await axios.put(`https://todo-server-l4cm.onrender.com/todos/${updatedTask.id}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token in the header
        }
      });
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (err) {
      console.error('Error updating task:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div 
    style={{ background: ColorConstants.primaryBg }}
    className='px-32 py-10'>
      <h1 className='text-center text-3xl mb-5'>Todos</h1>
      <Todoform onAddTask={addTask} />
      <Todolist tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
}
