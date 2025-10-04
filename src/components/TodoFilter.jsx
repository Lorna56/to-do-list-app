import React from "react";

const TodoFilter = ({ filter, setFilter, clearCompleted }) => {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
      <div className="space-x-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`capitalize px-3 py-1 rounded ${
              filter === f
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <button
        onClick={clearCompleted}
        className="text-red-500 hover:underline"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFilter;
