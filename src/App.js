import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await axios.post(API_URL, { title: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo("");
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center pt-10 px-3">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700 drop-shadow-sm">To-Do App</h1>

      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-md outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTodo}
          className="px-5 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
