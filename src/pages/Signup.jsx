// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider.jsx';
// import { toast } from 'react-toastify';

// const Signup = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', username: '', password: '', role: 'participant' });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(form);
//     toast.success('Signup Successful!');
//     navigate(form.role === 'organizer' ? '/dashboard' : '/');
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 p-8">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 animate-fadeIn"
//       >
//         <h2 className="text-4xl font-bold text-purple-700 text-center mb-4">Sign Up</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
//         />
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
//         />
//         <select
//           name="role"
//           onChange={handleChange}
//           className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
//         >
//           <option value="participant">Participant</option>
//           <option value="organizer">Organizer</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-semibold"
//         >
//           Sign Up
//         </button>
//         <p className="text-center text-gray-700 text-lg">
//           Already have an account?{' '}
//           <Link to="/signin" className="text-purple-600 font-semibold hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { toast } from "react-toastify";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    roles: ["participant"], // match backend schema (list)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      // keep roles as list for backend
      setForm({ ...form, roles: [value] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      toast.success("Signup Successful!");
      navigate(res.user.roles.includes("organizer") ? "/dashboard" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 animate-fadeIn"
      >
        <h2 className="text-4xl font-bold text-purple-700 text-center mb-4">
          Sign Up
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
        />
        <select
          name="roles"
          value={form.roles[0]}
          onChange={handleChange}
          className="w-full p-4 border rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg"
        >
          <option value="participant">Participant</option>
          <option value="organizer">Organizer</option>
        </select>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-semibold"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-700 text-lg">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
