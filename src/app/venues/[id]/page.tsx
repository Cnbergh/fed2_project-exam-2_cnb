'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/api/api';
import { useParams } from 'next/navigation';

const VenuePage = () => {
  const { id } = useParams();
  const { fetchVenueById } = useApi();
  const [venue, setVenue] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getVenue = async () => {
      try {
        const venueData = await fetchVenueById(id);
        setVenue(venueData);
      } catch (error) {
        console.error('Failed to fetch venue:', error);
      }
    };

    getVenue();
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <p>Price: {venue.price}</p>
      <p>Max Guests: {venue.maxGuests}</p>
      <button onClick={() => router.push(`/venues/edit/${id}`)}>Edit Venue</button>
    </div>
  );
};

export default VenuePage;
