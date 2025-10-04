
import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing && title.trim() !== todo.title) {
      editTodo(todo._id, title);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300
        ${todo.completed ? "bg-purple-100 border-purple-300" : "bg-purple-50 border-purple-200"} 
        hover:shadow-lg hover:scale-[1.01]`}
    >
      <div className="flex items-center flex-1 space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo._id, todo.completed)}
          className="accent-indigo-600 w-5 h-5"
        />
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-b border-indigo-400 outline-none bg-transparent px-1 py-0.5"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={handleEdit} // optional: double-click to edit
            className={`flex-1 cursor-pointer text-gray-800 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="text-indigo-600 hover:text-indigo-800 transition text-lg"
          title={isEditing ? "Save" : "Edit"}
        >
          {isEditing ? "💾" : "✏️"}
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="text-red-500 hover:text-red-700 transition text-lg"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

