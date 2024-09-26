"use client";
import React, { useState } from 'react';
import TodoItem from '../Components/todoitem';
import EditTaskModal from '../Components/edittask';
import Edittask from './edittask';

function TodoList({tasks,deleteTask,updateTask}) {
    const [editingTask, setEditingTask] = useState(null);


  const onEdit = (selectedId) => {
    const selectedTask=tasks.filter(task => (task.id === selectedId))
    setEditingTask(selectedTask[0]);
  };

  

  return (
    <div className='w-full'>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onDelete={deleteTask} onEdit={onEdit}/>
      ))}
    </ul>
     {editingTask && (
        <Edittask  
        task={editingTask} 
        onSave={updateTask} 
        onClose={() => setEditingTask(null)} 
        />
     )
    //  (
    //     <EditTaskModal 
    //       task={editingTask} 
    //       onSave={updateTask} 
    //       onClose={() => setEditingTask(null)} 
    //     />
    //   )
      }
    </div>
  );
}

export default TodoList;
