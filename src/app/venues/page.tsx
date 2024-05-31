'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApi } from '@/api/api';
import Card from '@/components/ui/card';
import Container from '@/components/container';

const VenuesPage = () => {
  const { fetchVenues, searchVenues } = useApi();
  const [venues, setVenues] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getVenues = async () => {
      try {
        const location = searchParams.get('location');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const guests = searchParams.get('guests');
        let venuesData;

        if (location || dateFrom || dateTo || guests) {
          venuesData = await searchVenues({ location, dateFrom, dateTo, guests });
        } else {
          venuesData = await fetchVenues();
        }

        setVenues(venuesData);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };

    getVenues();
  }, [searchParams]);

  return (
    <main className="pt-28 bg-slate-50">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Venues</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {venues.map((venue) => (
            <Card key={venue.id} venue={venue} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default VenuesPage;
