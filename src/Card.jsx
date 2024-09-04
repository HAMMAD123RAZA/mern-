import axios from 'axios';
import React, { useState } from 'react';
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";

const Card = ({ todo, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.todo);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/delete/${todo._id}`);
      console.log('Item deleted');
      onRemove(todo._id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await axios.put(`http://localhost:8080/update/${todo._id}`, { todo: updatedTodo });
      console.log('Item updated:', data);
      onUpdate(todo._id, updatedTodo); // Update the UI with the new data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <>
      <div className="bg-yellow-700 max-w-sm mx-auto">
        <div className="my-4 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
          {isEditing ? (
            <input
              type="text"
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
              className="flex-1 bg-white text-black rounded px-2 py-1"
            />
          ) : (
            <div className="flex-1 font-bold">
              {todo.todo}
            </div>
          )}
          <div className="flex items-center gap-2 text-white">
            {isEditing ? (
              <button onClick={handleUpdate}>
                <GoPencil size={28} className="cursor-pointer hover:text-blue-500" />
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <GoPencil size={28} className="cursor-pointer hover:text-blue-500" />
              </button>
            )}
            <button onClick={handleDelete}>
              <MdDelete size={28} className="cursor-pointer hover:text-red-500" />
            </button>
          </div>
        </div>
        <p className='font-thin px-4 pb-2 text-white'>{new Date(todo.createdAt).toLocaleString()}</p>
      </div>
    </>
  );
};

export default Card;
