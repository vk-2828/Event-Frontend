// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import EventCard from "../components/EventCard.jsx";
// import api from "../api/axios.js";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [participants, setParticipants] = useState({});
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     venue: "",
//     schedule: "",
//     rules: "",
//     contact: "",
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch all events from backend
//   const fetchEvents = async () => {
//     try {
//       const res = await api.get("/events");
//       if (Array.isArray(res.data)){
//         console.log(res.data)
//         setEvents(res.data);
//       }
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load events");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle input changes for new event
//   const handleChange = (e) =>
//     setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

//   // Create a new event
//   const handleAddEvent = async () => {
//     if (!newEvent.title || !newEvent.description) {
//       toast.error("Please fill in title & description!");
//       return;
//     }
//     try {
//       const res = await api.post("/events", newEvent);
//       setEvents((prev) => [res.data, ...prev]);
//       setNewEvent({
//         title: "",
//         description: "",
//         date: "",
//         venue: "",
//         schedule: "",
//         rules: "",
//         contact: "",
//       });
//       toast.success("Event Created!");
//     } catch (err) {
//       toast.error(err.response?.data?.detail || "Failed to create event");
//     }
//   };

//   // Delete event locally (optional: implement backend delete later)
//   const handleDelete = (idx) => {
//     const updated = events.filter((_, i) => i !== idx);
//     setEvents(updated);
//     toast.info("Event Deleted!");
//   };

//   // Fetch participants for a specific event
//   const handleViewParticipants = async (eventId) => {
//     try {
//       const res = await api.get(`/registrations/event/${eventId}`);
//       setParticipants((prev) => ({ ...prev, [eventId]: res.data }));
//     } catch (err) {
//       toast.error("Failed to fetch participants");
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-xl">Loading events...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-5">
//       <h1 className="text-5xl font-bold text-purple-700 mb-5 animate-pulse">
//         Organizer Dashboard
//       </h1>

//       {/* Add New Event */}
//       <div className="bg-white p-6 rounded-3xl shadow-2xl mb-5">
//         <h2 className="text-3xl font-semibold text-purple-600 mb-4">Add New Event</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {["title","description","date","venue","schedule","rules","contact"].map((field) => (
//             <input
//               key={field}
//               type={field==="date"?"date":"text"}
//               name={field}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={newEvent[field]}
//               onChange={handleChange}
//               className="p-3 border rounded-xl"
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleAddEvent}
//           className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
//         >
//           Add Event
//         </button>
//       </div>

//       {/* Event List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event, idx) => (
//           <div key={event.id} className="relative group bg-white p-4 rounded-2xl shadow-lg">
//             <EventCard event={event} />
//             <div className="flex justify-between mt-3">
//               <button
//                 onClick={() => handleDelete(idx)}
//                 className="bg-red-500 text-white px-3 py-1 rounded-lg"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleViewParticipants(event.id)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-lg"
//               >
//                 View Participants
//               </button>
//             </div>

//             {/* Participants List */}
//             {participants[event.id] && participants[event.id].length > 0 && (
//               <div className="mt-3 border-t pt-2">
//                 <h4 className="font-semibold text-purple-600">
//                   Participants ({participants[event.id].length}):
//                 </h4>
//                 <ul className="list-disc pl-5">
//                   {participants[event.id].map((p, i) => (
//                     <li key={i}>{p.name} ({p.email})</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    schedule: "",
    rules: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      }
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input
  const handleChange = (e) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  // Create new event
  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description) {
      toast.error("Please fill in title & description!");
      return;
    }
    try {
      const res = await api.post("/events", newEvent);
      setEvents((prev) => [res.data, ...prev]);
      resetForm();
      toast.success("Event Created!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to create event");
    }
  };

  // Start editing event
  const handleEditEvent = (event) => {
    setEditingEventId(event.id || event._id);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.split("T")[0] : "",
      venue: event.venue || "",
      schedule: event.schedule || "",
      rules: event.rules || "",
      contact: event.contact || "",
    });
  };

  // Update event
  const handleUpdateEvent = async () => {
    try {
      const res = await api.put(`/events/${editingEventId}`, newEvent);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEventId || e._id === editingEventId ? res.data : e
        )
      );
      toast.success("Event Updated!");
      resetForm();
      setEditingEventId(null);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to update event");
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) =>
        prev.filter((e) => e.id !== eventId && e._id !== eventId)
      );
      toast.info("Event Deleted!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to delete event");
    }
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      title: "",
      description: "",
      date: "",
      venue: "",
      schedule: "",
      rules: "",
      contact: "",
    });
  };

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading events...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-5">
      <h1 className="text-5xl font-bold text-purple-700 mb-5 animate-pulse">
        Organizer Dashboard
      </h1>

      {/* Add or Edit Event */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl mb-5">
        <h2 className="text-3xl font-semibold text-purple-600 mb-4">
          {editingEventId ? "Edit Event" : "Add New Event"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "description", "date", "venue", "schedule", "rules", "contact"].map(
            (field) => (
              <input
                key={field}
                type={field === "date" ? "date" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newEvent[field]}
                onChange={handleChange}
                className="p-3 border rounded-xl"
              />
            )
          )}
        </div>
        <button
          onClick={editingEventId ? handleUpdateEvent : handleAddEvent}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          {editingEventId ? "Update Event" : "Add Event"}
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id || event._id}
            className="relative group bg-white p-4 rounded-2xl shadow-lg"
          >
            <EventCard event={event} />
            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEditEvent(event)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id || event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
