import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await registerUser(formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">Create an Account</h2>
        {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400" required />
          <button type="submit" disabled={loading} className={`w-full py-2 text-white font-semibold rounded-md transition ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth/register";

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const res = await axios.post(API_URL, formData);
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         navigate("/");
//       }
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">Create an Account</h2>

//         {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 text-white font-semibold rounded-md transition ${
//               loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
