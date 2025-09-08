// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider.jsx';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 h-24 shadow-lg transition-colors duration-500">
//       <div className="container mx-auto flex justify-between items-center h-full px-6">
//         <Link to="/" className="text-3xl font-bold text-white">EventEase</Link>

//         <div className="flex items-center space-x-6 text-xl">
//           <Link to="/" className="text-white">Home</Link>
//           {!user && <Link to="/signup" className="text-white">Signup</Link>}
//           {!user && <Link to="/signin" className="text-white">Signin</Link>}
//           {user?.role === 'organizer' && <Link to="/dashboard" className="text-white">Dashboard</Link>}
//           {user && <button onClick={logout} className="bg-white text-purple-600 px-4 py-2 rounded-xl hover:bg-gray-200 transition">Logout</button>}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider.jsx';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 h-24 shadow-lg transition-colors duration-500">
//       <div className="container mx-auto flex justify-between items-center h-full px-6">
//         <Link to="/" className="text-3xl font-bold text-white">EventEase</Link>

//         <div className="flex items-center space-x-6 text-xl">
//           <Link to="/" className="text-white">Home</Link>
//           {!user && <Link to="/signup" className="text-white">Signup</Link>}
//           {!user && <Link to="/signin" className="text-white">Signin</Link>}

//           {/* Organizer Dashboard visible only for organizers */}
//           {user?.roles?.includes("organizer") && (
//             <Link to="/dashboard" className="text-white">Dashboard</Link>
//           )}

//           {/* Participant "My Registrations" */}
//           {user?.roles?.includes("participant") && (
//             <Link to="/my-registrations" className="text-white">MyRegistrations</Link>
//           )}

//           {user && (
//             <button
//               onClick={logout}
//               className="bg-white text-purple-600 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    // Keyframe animation class has been removed.
    <nav className="bg-gradient-to-r from-peach-soft to-peach-primary h-20 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-full px-6">
        
        <Link to="/" className="text-3xl font-bold text-slate-800">EventEase</Link>

        <div className="flex items-center space-x-8 text-lg font-medium text-slate-700"> {/* Increased space-x for better spacing */}
          
          {/* STEP 1: The old hover and custom classes are gone.
            STEP 2: We added a set of pure Tailwind classes for the new underline effect.
          */}
          <Link 
            to="/" 
            className="bg-gradient-to-r from-slate-700 to-slate-700 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
          >
            Home
          </Link>
          
          {!user && (
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-slate-700 to-slate-700 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Signup
            </Link>
          )}

          {!user && (
            <Link 
              to="/signin"
              className="bg-gradient-to-r from-slate-700 to-slate-700 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Signin
            </Link>
          )}

          {user?.roles?.includes("organizer") && (
            <Link 
              to="/dashboard"
              className="bg-gradient-to-r from-slate-700 to-slate-700 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Dashboard
            </Link>
          )}

          {user?.roles?.includes("participant") && (
            <Link 
              to="/my-registrations"
              className="bg-gradient-to-r from-slate-700 to-slate-700 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              My Registrations
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="bg-peach-accent  px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;