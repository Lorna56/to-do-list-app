// // src/components/TodoInput.js
// import React, { useState } from "react";

// function TodoInput({ addTodo }) {
//   const [text, setText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     addTodo(text);
//     setText("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
//         placeholder="Add a new task..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         Add
//       </button>
//     </form>
//   );
// }

// export default TodoInput;
