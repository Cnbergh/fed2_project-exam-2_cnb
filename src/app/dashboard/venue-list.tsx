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
                className=" text-black px-2 py-1 rounded hover:bg-gray-200 transition mt-2"
                onClick={() => onVenueClick(venue.id)}
              >
                View Bookings
              </button>
              <button
                className="text-black px-2 py-1 rounded hover:bg-gray-200 transition mt-2"
                onClick={() => onEditVenue(venue)}
              >
                Edit
              </button>
              <button
                className="text-black px-2 py-1 rounded hover:bg-gray-200 transition mt-2"
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
