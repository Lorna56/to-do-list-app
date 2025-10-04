import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className="flex items-center justify-between bg-white rounded-lg shadow p-3 hover:shadow-md transition">
      <span
        onClick={() => toggleTodo(todo._id, todo.completed)}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo(todo._id)}
        className="ml-3 text-red-500 hover:text-red-600 font-bold text-lg"
      >
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
