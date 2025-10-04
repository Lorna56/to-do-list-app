// import React from "react";

// const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
//   return (
//     <li className="flex items-center justify-between bg-white rounded-lg shadow p-3 hover:shadow-md transition">
//       <span
//         onClick={() => toggleTodo(todo._id, todo.completed)}
//         className={`flex-1 cursor-pointer ${
//           todo.completed ? "line-through text-gray-400" : "text-gray-800"
//         }`}
//       >
//         {todo.title}
//       </span>
//       <button
//         onClick={() => deleteTodo(todo._id)}
//         className="ml-3 text-red-500 hover:text-red-600 font-bold text-lg"
//       >
//         ✕
//       </button>
//     </li>
//   );
// };

// export default TodoItem;
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
    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 transition">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo._id, todo.completed)}
          className="mr-3 accent-indigo-600"
        />
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-b border-indigo-400 outline-none bg-transparent"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer ${
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
          className="text-indigo-600 hover:text-indigo-800 transition"
        >
          {isEditing ? "💾" : "✏️"}
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
