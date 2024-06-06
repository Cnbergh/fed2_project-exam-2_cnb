'use client';

import React from 'react';

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    continent: string | null;
    lat: number;
    lng: number;
  };
}

interface VenueListProps {
  venues: Venue[];
  onVenueClick: (venueId: string) => void;
  onEditVenue: (venue: Venue) => void;
  onDeleteVenue: (venueId: string) => void;
}

const VenueList: React.FC<VenueListProps> = ({ venues, onVenueClick, onEditVenue, onDeleteVenue }) => {
  return (
    <div className="mt-4">
      {venues.length === 0 ? (
        <p>No venues found.</p>
      ) : (
        <ul className="space-y-2">
          {venues.map((venue) => (
            <li key={venue.id} className="border p-2 rounded">
              <p className="font-bold">{venue.name}</p>
              <p>{venue.description}</p>
              <button onClick={() => onVenueClick(venue.id)}>View</button>
              <button onClick={() => onEditVenue(venue)}>Edit</button>
              <button onClick={() => onDeleteVenue(venue.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VenueList;
