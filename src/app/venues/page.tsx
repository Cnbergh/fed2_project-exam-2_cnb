'use client'
import React, { useEffect, useState } from 'react';
import fetcher from '@/lib/fetcher';
import { API_URL } from '@/api/constants';

const Venues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await fetcher(`${API_URL}/holidaze/venues`);
        setVenues(data);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map(venue => (
          <li key={venue.id}>{venue.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Venues;
