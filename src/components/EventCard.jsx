import React from 'react';
import { useNavigate } from 'react-router-dom';

// UPDATED: Added your two new iStackphoto images to the collection
const eventImages = [
  'https://media.istockphoto.com/id/1313246059/photo/online-conference-of-diverse-employees-on-the-screen.jpg?s=1024x1024&w=is&k=20&c=vKapiL67aYcszOYv5u33NTRrRoLfu4NOPAut1xTadqU=',
  'https://media.istockphoto.com/id/1788138969/photo/senior-developers-in-a-coworking-space.jpg?s=2048x2048&w=is&k=20&c=WztYvlOBVXf6ywb13gjeY9eEOOVPnYQhA3xdOI4dHhg=',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
];

const EventCard = ({ event }) => {
  const { id, title, date, venue, description } = event;
  const navigate = useNavigate();

  const handleViewEvent = () => {
    navigate(`/events/${id}`);
  };

  const imageSrc = eventImages[id % eventImages.length];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-purple-700 mb-2">{title}</h3>

        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold text-gray-800">Date:</span> {new Date(date).toDateString()}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-semibold text-gray-800">Location:</span> {venue}
        </p>

        <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        <button
          onClick={handleViewEvent}
          className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold"
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;

//before changes

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const EventCard = ({ event }) => {
//   const { id, title, date, venue, description } = event;
//   console.log(event.id)
//   const navigate = useNavigate();

//   const handleViewEvent = () => {
//     navigate(`/events/${id}`);
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
//       <img src='' alt={title} className="w-full h-48 object-cover" />
//       <div className="p-5">
//         <h3 className="text-2xl font-bold text-purple-700 mb-2">{title}</h3>
//         <p className="text-gray-600 mb-1"><span className="font-semibold">Date:</span> {new Date(date).toDateString()}</p>
//         <p className="text-gray-600 mb-3"><span className="font-semibold">Location:</span> {venue}</p>
//         <p className="text-gray-600 mb-3"><span className="font-semibold">Description:</span> {description}</p>
//         <button
//           onClick={handleViewEvent}
//           className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold"
//         >
//           View Event
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
