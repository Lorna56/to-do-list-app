// // src/pages/TodoDashboard.js
// import React, { useEffect, useState } from "react";
// import api from "../api/todoApi";
// import TodoInput from "../components/TodoInput";
// import TodoItem from "../components/TodoItem";
// import TodoFilter from "../components/TodoFilter";
// import LoadingSpinner from "../components/LoadingSpinner";
// import { useNavigate } from "react-router-dom";

// function TodoDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return navigate("/");
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     const res = await api.get("/todos", { headers: { Authorization: `Bearer ${token}` } });
//     setTodos(res.data);
//     setLoading(false);
//   };

//   const addTodo = async (text) => {
//     const res = await api.post("/todos", { text }, { headers: { Authorization: `Bearer ${token}` } });
//     setTodos([...todos, res.data]);
//   };

//   const toggleComplete = async (id) => {
//     const res = await api.put(`/todos/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
//     setTodos(todos.map((t) => (t._id === id ? res.data : t)));
//   };

//   const deleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     setTodos(todos.filter((t) => t._id !== id));
//   };

//   const filtered = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800">Your Tasks</h1>
//         <TodoInput addTodo={addTodo} />
//         <TodoFilter filter={filter} setFilter={setFilter} />
//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <ul className="space-y-2">
//             {filtered.map((todo) => (
//               <TodoItem
//                 key={todo._id}
//                 todo={todo}
//                 toggleComplete={toggleComplete}
//                 deleteTodo={deleteTodo}
//               />
//             ))}
//           </ul>
//         )}
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/");
//           }}
//           className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TodoDashboard;
// src/pages/TodoDashboard.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api, { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

// import TodoInput from "../components/TodoInput";
// import TodoItem from "../components/TodoItem";
// import TodoFilter from "../components/TodoFilter";
// import LoadingSpinner from "../components/LoadingSpinner";

// export default function TodoDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check if user is authenticated
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/login");
//     fetchTodos();
//   }, []);

//   // Fetch all todos
//   const fetchTodos = async () => {
//     try {
//       const res = await getTodos();
//       setTodos(res.data);
//     } catch (err) {
//       console.error("Failed to fetch todos:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new todo
//   const handleAddTodo = async (text) => {
//     try {
//       const res = await createTodo({ title: text });
//       setTodos([res.data, ...todos]);
//     } catch (err) {
//       console.error("Failed to add todo:", err);
//     }
//   };

//   // Toggle complete/incomplete
//   const handleToggleComplete = async (id) => {
//     try {
//       const todo = todos.find((t) => t._id === id);
//       const res = await updateTodo(id, { completed: !todo.completed });
//       setTodos(todos.map((t) => (t._id === id ? res.data : t)));
//     } catch (err) {
//       console.error("Failed to update todo:", err);
//     }
//   };

//   // Delete a todo
//   const handleDeleteTodo = async (id) => {
//     try {
//       await deleteTodo(id);
//       setTodos(todos.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Failed to delete todo:", err);
//     }
//   };

//   // Filter todos
//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800">Your Tasks</h1>

//         <TodoInput addTodo={handleAddTodo} />
//         <TodoFilter filter={filter} setFilter={setFilter} />

//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <ul className="space-y-2">
//             {filteredTodos.map((todo) => (
//               <TodoItem
//                 key={todo._id}
//                 todo={todo}
//                 toggleComplete={handleToggleComplete}
//                 deleteTodo={handleDeleteTodo}
//               />
//             ))}
//           </ul>
//         )}

//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/login");
//           }}
//           className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
