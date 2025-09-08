// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider.jsx";
// import api from "../api/axios.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // A small, reusable component for displaying key details with icons
// const DetailItem = ({ icon, label, value }) => (
//   <div>
//     <h3 className="font-semibold text-gray-800 flex items-center mb-1">
//       <span className="mr-2 text-purple-600">{icon}</span>
//       {label}
//     </h3>
//     <p className="text-gray-600 pl-8">{value}</p>
//   </div>
// );

// const EventDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ college: "", phone: "" });
//   const [registered, setRegistered] = useState(false);

//   useEffect(() => {
//     // --- FIX APPLIED HERE ---
//     // We convert the ID from the URL (which is a string) into a number.
//     const eventIdAsNumber = parseInt(id, 10);
//     if (isNaN(eventIdAsNumber)) {
//         setLoading(false);
//         // Handle cases where the ID is not a valid number
//         return;
//     }

//     const fetchEvent = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const eventRes = await api.get(`/events/${eventIdAsNumber}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvent(eventRes.data);

//         if (user?.roles.includes("participant")) {
//           const regRes = await api.get("/registrations/me", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           // We now compare number to number, which is reliable.
//           const isRegistered = regRes.data.some((reg) => reg.event_id === eventIdAsNumber);
//           setRegistered(isRegistered);
//         }

//         if (user?.roles.includes("organizer")) {
//           const participantsRes = await api.get(`/events/${eventIdAsNumber}/participants`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setParticipants(participantsRes.data);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id, user]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     if (!formData.college || !formData.phone) {
//       toast.error("Please provide college and phone number");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("token");
      
//       // --- FIX APPLIED HERE ---
//       // We send the ID as a number, which the backend expects.
//       const registrationData = {
//         event_id: parseInt(id, 10),
//         name: user.name || "",
//         email: user.email || "",
//         college: formData.college,
//         phone: formData.phone,
//       };

//       await api.post("/registrations", registrationData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success("Registered successfully!");
//       setRegistered(true);
//       setTimeout(() => navigate("/my-registrations"), 1500);
//     } catch (err) {
//       toast.error("Registration failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xl">Loading...</div>;
//   if (!event) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xl">Event not found!</div>;

//   const imageSrc = `https://picsum.photos/seed/${id}/1200/800`;

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-8">
//       <ToastContainer position="bottom-right" />
//       <div className="max-w-7xl mx-auto">
        
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700">{event.title}</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
//           <div className="lg:col-span-2 space-y-8">
//             <img src={imageSrc} alt={event.title} className="w-full h-auto object-cover rounded-2xl shadow-xl" />
            
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-3xl font-bold text-purple-700 mb-6">Event Details</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                 <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Date" value={new Date(event.date).toDateString()} />
//                 <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label="Venue" value={event.venue || 'N/A'} />
//                 {event.schedule && <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Schedule" value={event.schedule} />}
//                 {event.contact && <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} label="Contact" value={event.contact} />}
//               </div>
//               <div className="border-t border-slate-200 mt-8 pt-6">
//                 <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
//                 <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.description}</p>
//               </div>
//             </div>
//             {event.rules && (
//               <div className="bg-white rounded-2xl shadow-xl p-8">
//                 <h2 className="text-3xl font-bold text-purple-700 mb-4">Rules & Guidelines</h2>
//                 <ul className="list-disc list-inside text-gray-600 space-y-2">
//                   {event.rules.split("\n").map((rule, idx) => (<li key={idx}>{rule}</li>))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               {user?.roles.includes("participant") && (
//                 <div className="bg-white rounded-2xl p-6 shadow-xl">
//                   {registered ? (
//                     <div className="text-center">
//                       <h2 className="text-2xl font-bold text-green-600">You're Registered!</h2>
//                       <p className="text-gray-600 mt-2">We'll see you there. Check your registrations for more details.</p>
//                     </div>
//                   ) : (
//                     <>
//                       <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Register Now</h2>
//                       <div className="space-y-4">
//                         <input type="text" value={user.name || ""} disabled placeholder="Name" className="w-full p-3 bg-slate-200 text-slate-500 border border-slate-300 rounded-xl" />
//                         <input type="email" value={user.email || ""} disabled placeholder="Email" className="w-full p-3 bg-slate-200 text-slate-500 border border-slate-300 rounded-xl" />
//                         <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="Your College" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
//                         <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
//                       </div>
//                       <button onClick={handleRegister} className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold">
//                         Confirm Registration
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {user?.roles.includes("organizer") && (
//           <div className="mt-12">
//             <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Participants ({participants.length})</h2>
//             {participants.length === 0 ? (
//               <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
//                 <p>No one has registered for this event yet.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {participants.map((p, idx) => (
//                   <div key={idx} className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//                     <h3 className="text-lg font-semibold text-purple-700 truncate">{p.name}</h3>
//                     <p className="text-gray-600 truncate">{p.email}</p>
//                     {p.college && <p className="text-gray-600 truncate">College: {p.college}</p>}
//                     {p.phone && <p className="text-gray-600 truncate">Phone: {p.phone}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         <div className="text-center mt-12">
//             <Link to="/" className="text-purple-600 font-semibold hover:underline">
//                 &larr; Back to All Events
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;


// below is main

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import api from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ college: "", phone: "" });
  const [registered, setRegistered] = useState(false); // track if registered

  
  useEffect(() => {
  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch event details
      const eventRes = await api.get(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent(eventRes.data);

      // Fetch user registrations to check if already registered
      if (user?.roles.includes("participant")) {
        const regRes = await api.get("/registrations/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const isRegistered = regRes.data.some(
          (reg) => reg.event_id === id
        );
        setRegistered(isRegistered); // ✅ mark as registered if already done
      }

      // Fetch participants if organizer
      if (user?.roles.includes("organizer")) {
        const participantsRes = await api.get(
          `/events/${id}/participants`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setParticipants(participantsRes.data);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  fetchEvent();
}, [id, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.college || !formData.phone) {
      toast.error("Please provide college and phone number");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const registrationData = {
        event_id: id,
        name: user.name || "",
        email: user.email || "",
        college: formData.college,
        phone: formData.phone,
      };

      await api.post("/registrations", registrationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Registered successfully!");
      setRegistered(true);          // mark as registered
      setTimeout(() => navigate("/my-registrations"), 1500); // redirect after 1.5s
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(
        "Registration failed: " + JSON.stringify(err.response?.data)
      );
    }
  };

  if (loading) return <div className="text-center text-xl mt-20">Loading...</div>;
  if (!event) return <div className="text-center text-xl mt-20">Event not found!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">{event.title}</h1>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}</p>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Venue:</span> {event.venue || 'N/A'}</p>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Description:</span> {event.description}</p>
        {event.schedule && <p className="text-gray-700 text-lg"><span className="font-semibold">Schedule:</span> {event.schedule}</p>}
        {event.rules && event.rules.length > 0 && (
          // <div className="mt-2">
          //   <h2 className="text-2xl font-semibold text-purple-700 mb-1">Rules / Guidelines:</h2>
          //   <ul className="list-disc list-inside text-gray-700">
          //     {event.rules.split("\n").map((rule, idx) => (
          //       <li key={idx}>{rule}</li>
          //     ))}
          //   </ul>
          // </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
  <h2 className="text-3xl font-bold text-purple-700 mb-4">Rules & Guidelines</h2>
  
  <ol className="list-decimal list-inside space-y-3 text-gray-700">
    {event.rules
      .replace(/\./g, '.\n') // First, replace every period with itself plus a newline
      .split('\n')           // Now, split the entire string by newlines
      .filter(rule => rule.trim() !== "") // This cleans up any empty lines
      .map((rule, idx) => (
        <li key={idx} className="pl-2">
          {rule.trim()}
        </li>
      ))
    }
  </ol>
</div>
        )}
        {event.contact && <p className="text-gray-700 text-lg mt-2"><span className="font-semibold">Contact:</span> {event.contact}</p>}
      </div>


      {/* Registration Form for Participants */}
      {user?.roles.includes("participant") && !registered && (
        <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Register for Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={user.name || ""} disabled placeholder="Name" className="p-3 border rounded-xl" />
            <input type="email" value={user.email || ""} disabled placeholder="Email" className="p-3 border rounded-xl" />
            <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="College" className="p-3 border rounded-xl" />
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="p-3 border rounded-xl" />
          </div>
          <button
            onClick={handleRegister}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold"
          >
            Register
          </button>
        </div>
      )}

      {/* Participants List for Organizer */}
      {user?.roles.includes("organizer") && (
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Participants ({participants.length})</h2>
          {participants.length === 0 ? (
            <p className="text-gray-700 text-lg">No participants registered yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participants.map((p, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
                  <h3 className="text-xl font-semibold text-purple-700">{p.name}</h3>
                  <p className="text-gray-700"><span className="font-semibold">Email:</span> {p.email}</p>
                  {p.college && <p className="text-gray-700"><span className="font-semibold">College:</span> {p.college}</p>}
                  {p.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {p.phone}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Link to="/" className="block text-center mt-8 text-purple-600 font-semibold hover:underline">
        Back to Events
      </Link>
    </div>
  );
};

export default EventDetails;
