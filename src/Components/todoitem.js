import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ColorConstants from '../constants/colors';

const TodoItem = ({ task, onDelete ,onEdit}) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'done':
        return { borderColor: '#4caf50' }; // Green border
      case 'in progress':
        return { borderColor: '#ff9800' }; // Orange border
      case 'pending':
        return { borderColor: '#f44336' }; // Red border
      case 'hold':
        return { borderColor: '#2196f3' }; // Blue border
      default:
        return { borderColor: '#9e9e9e' }; // Grey border
    }
  };

  const { borderColor } = getStatusStyles(task.status);
 
  return (
    <li
      style={{
        backgroundColor: ColorConstants.secondaryBg,
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        border: `2px solid ${borderColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ color: ColorConstants.primaryText ,textDecoration: (task.status === "done") ? "line-through" : "none" }} >{task.title}</h3>
      </div>
      <div className='flex'>
        <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: ColorConstants.highlet }} onClick={() => onEdit(task.id)} />
        <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => onDelete(task.id)} />
      </div>
    </li>
  );
};

export default TodoItem;
