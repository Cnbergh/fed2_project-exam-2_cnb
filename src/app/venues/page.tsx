'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/api/api';
import Card from '@/components/ui/card';

const VenuesPage = () => {
  const { fetchVenues } = useApi();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const venuesData = await fetchVenues();
        setVenues(venuesData);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };

    getVenues();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {venues.map((venue) => (
          <Card key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenuesPage;
