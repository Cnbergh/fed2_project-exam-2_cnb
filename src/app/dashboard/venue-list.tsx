'use client';

import React from 'react';

const VenueList = ({ venues, onVenueClick, onEditVenue, onDeleteVenue }) => {
  return (
    <div className="mt-4">
      {venues.length === 0 ? (
        <p>No venues found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="p-4 border rounded">
              <h2 className="text-xl font-bold">{venue.name}</h2>
              <p>{venue.description}</p>
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition mt-2"
                onClick={() => onVenueClick(venue.id)}
              >
                View Bookings
              </button>
              <button 
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition mt-2 ml-2"
                onClick={() => onEditVenue(venue)}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition mt-2 ml-2"
                onClick={() => onDeleteVenue(venue.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueList;
