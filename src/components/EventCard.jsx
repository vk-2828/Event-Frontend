import React from 'react';

const EventCard = ({ title, date, location, image }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-2xl font-bold text-purple-700 mb-2">{title}</h3>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Date:</span> {date}</p>
        <p className="text-gray-600 mb-3"><span className="font-semibold">Location:</span> {location}</p>
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;