import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Dummy events data (replace with API/backend later)
const events = [
  { 
    id: 1, 
    title: "Tech Conference 2025", 
    date: "Sep 20, 2025", 
    time: "10:00 AM - 5:00 PM",
    location: "New York", 
    image: "https://source.unsplash.com/800x400/?conference", 
    description: "A full-day tech conference covering AI, Web3, and cloud computing.",
    rules: ["Must register online", "Bring valid ID", "Follow the code of conduct"]
  },
  { 
    id: 2, 
    title: "Music Fest", 
    date: "Oct 10, 2025", 
    time: "3:00 PM - 11:00 PM",
    location: "Los Angeles", 
    image: "https://source.unsplash.com/800x400/?music", 
    description: "Experience live performances from top artists around the world.",
    rules: ["No outside food or drinks", "Tickets are non-refundable"]
  },
  // Add other events similarly
];

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) return <div className="text-center text-xl mt-20">Event not found!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <div className="p-8 space-y-4">
          <h1 className="text-4xl font-bold text-purple-700">{event.title}</h1>
          <p className="text-gray-700 text-lg"><span className="font-semibold">Date:</span> {event.date}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold">Time:</span> {event.time}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold">Location:</span> {event.location}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold">Description:</span> {event.description}</p>
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Rules / Guidelines:</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {event.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold mt-4">
            Register / Join Event
          </button>
          <Link to="/" className="block text-center mt-4 text-purple-600 font-semibold hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;