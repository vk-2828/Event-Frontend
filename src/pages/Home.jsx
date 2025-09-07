
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

// Dummy event data
const events = [
  { id: 1, title: "Tech Conference 2025", date: "Sep 20, 2025", location: "New York", type: "Event", image: "https://source.unsplash.com/400x300/?conference" },
  { id: 2, title: "Music Fest", date: "Oct 10, 2025", location: "Los Angeles", type: "Event", image: "https://source.unsplash.com/400x300/?music" },
  { id: 3, title: "Art Expo", date: "Nov 05, 2025", location: "Paris", type: "Workshop", image: "https://source.unsplash.com/400x300/?art" },
  { id: 4, title: "Startup Meetup", date: "Dec 01, 2025", location: "San Francisco", type: "Hackathon", image: "https://source.unsplash.com/400x300/?startup" },
  { id: 5, title: "Gaming Convention", date: "Dec 15, 2025", location: "Tokyo", type: "Past Event", image: "https://source.unsplash.com/400x300/?gaming" },
];

const tabs = ["All", "Hackathons", "Events", "Workshop", "Past Events"];

const Home = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    activeTab === "All" ? events : events.filter(event => event.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8">
      
      {/* Hero Section */}
      {!user && (
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-5 animate-bounce">Welcome to EventEase</h1>
          <p className="text-xl text-gray-700 mb-8">Your ultimate platform to organize and join events seamlessly!</p>
          <div className="space-x-5">
            <Link to="/signup" className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition">Get Started</Link>
            <Link to="/signin" className="bg-white text-purple-600 px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition">Signin</Link>
          </div>
        </div>
      )}

      {/* Open Events Header */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">Open Events</h2>
        <p className="text-gray-700 text-lg">Discover upcoming hackathons and competitions. Join the community of innovators and creators.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8 space-x-4 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === tab ? "bg-purple-600 text-white shadow-lg" : "bg-white text-purple-700 hover:bg-purple-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredEvents.map(event => (
          <EventCard key={event.id} title={event.title} date={event.date} location={event.location} image={event.image} />
        ))}
      </div>
    </div>
  );
};

export default Home;