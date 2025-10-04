import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
        <p onClick={() => navigate("/register")} className="text-sm text-center text-indigo-500 cursor-pointer">Don't have an account? Register</p>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import api from "../api/todoApi";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await api.post("/auth/login", form);
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
//         <p onClick={() => navigate("/register")} className="text-sm text-center text-indigo-500 cursor-pointer">
//           Don't have an account? Register
//         </p>
//       </form>
//     </div>
//   );
// }
