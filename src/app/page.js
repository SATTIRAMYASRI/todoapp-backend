"use client"
import React, { useState ,useEffect} from 'react';
import Todoform from '../Components/todoform';
import Todolist from '../Components/todolist';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    axios.get('https://todo-server-l4cm.onrender.com/todos',{}).then(
      res=>{
        try{
          setTasks(res.data)
        }
        catch(err){
          console.log(err)
        }
      }
    )
  },[])

  const addTask = (newTask) => {
    axios.post('https://todo-server-l4cm.onrender.com/todos',newTask).then(
      res=>{
        try{
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }
        catch(err){
          console.log(err)
        }
      }
    )
  };

  const deleteTask = (id) => {
    // setTasks(tasks.filter(task => task.id !== id));
    axios.delete(`https://todo-server-l4cm.onrender.com/todos/${id}`).then(
      res=>{
        console.log(res);
        try{
          const newtodos=tasks.filter(task => task.id !== id)
          setTasks(newtodos)
        }
        catch(err){
          console.log(err)
        }
      }
    )
  };

  const updateTask = (updatedTask) => {
    // setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    axios.put(`https://todo-server-l4cm.onrender.com/todos/${updatedTask.id}`,updatedTask).then(
      res=>{
        console.log(res);
        try{
          const updatetodo=tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
          setTasks(updatetodo)
        }
        catch(err){
          console.log(err)
        }
      }
    )
  };

  return (
    <div className='px-32 py-10'>
      <h1
      className='text-center text-3xl mb-5'
      >Todos</h1>
      <Todoform onAddTask={addTask} />
      <Todolist tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
    </div>
  );
}
