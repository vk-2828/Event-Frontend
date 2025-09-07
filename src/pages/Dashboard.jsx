import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard.jsx'; 
const Dashboard = () => {
  const [events, setEvents] = useState([
    { title: 'Music Festival', description: 'Live performances by top artists', date: '2025-10-05', location: 'Central Park' },
    { title: 'Tech Meetup', description: 'Networking & workshops for developers', date: '2025-10-12', location: 'Tech Hub' }
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });

  const handleChange = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  const handleAddEvent = () => {
    if(newEvent.title && newEvent.description) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      toast.success('Event Added!');
    } else {
      toast.error('Please fill title & description!');
    }
  };

  const handleDelete = (idx) => {
    const updated = events.filter((_, i) => i !== idx);
    setEvents(updated);
    toast.info('Event Deleted!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-5">
      <h1 className="text-5xl font-bold text-purple-700 mb-5 animate-pulse">Organizer Dashboard</h1>

      <div className="bg-white p-6 rounded-3xl shadow-2xl mb-5">
        <h2 className="text-3xl font-semibold text-purple-600 mb-4">Add New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} className="p-3 border rounded-xl"/>
          <input type="text" name="description" placeholder="Description" value={newEvent.description} onChange={handleChange} className="p-3 border rounded-xl"/>
          <input type="date" name="date" value={newEvent.date} onChange={handleChange} className="p-3 border rounded-xl"/>
          <input type="text" name="location" placeholder="Location" value={newEvent.location} onChange={handleChange} className="p-3 border rounded-xl"/>
        </div>
        <button onClick={handleAddEvent} className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">Add Event</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div key={idx} className="relative group">
            <EventCard event={event} />
            <button onClick={() => handleDelete(idx)} className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;