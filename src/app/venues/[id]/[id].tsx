import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '@/lib/fetcher';
import { API_URL } from '@/api/constants';

const VenueDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchVenue = async () => {
        try {
          const data = await fetcher(`${API_URL}/holidaze/venues/${id}`);
          setVenue(data);
        } catch (error) {
          console.error('Failed to fetch venue:', error);
        }
      };
      fetchVenue();
    }
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      {/* Display additional venue details here */}
    </div>
  );
};

export default VenueDetail;
