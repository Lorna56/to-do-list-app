
import React, { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api/todoApi";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return toast.info("Please enter a task");
    try {
      const res = await createTodo({ title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
      toast.success("Task added");
    } catch {
      toast.error("Failed to add task");
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await updateTodo(id, { completed: !completed });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch {
      toast.error("Failed to update task");
    }
  };

  const editTodo = async (id, title) => {
    try {
      const res = await updateTodo(id, { title });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Failed to edit task");
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const clearCompleted = () => {
    const active = todos.filter((t) => !t.completed);
    setTodos(active);
    toast.info("Cleared completed tasks");
  };

  const filteredTodos =
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "completed"
      ? todos.filter((t) => t.completed)
      : todos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 mt-8">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-5 text-center">
          📝 My To-Do List
        </h1>

        <div className="flex mb-5">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border rounded-l-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTodo}
            className="px-5 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        <TodoFilter filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />

        {loading ? (
          <LoadingSpinner />
        ) : filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No tasks found 🎉</p>
        ) : (
          <ul className="space-y-2 mt-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={removeTodo}
                editTodo={editTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
