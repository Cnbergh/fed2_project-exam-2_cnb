'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';
import Container from '@/components/container';
import Card from '@/components/ui/card';

const MyBookingsPage = () => {
  const { fetchBookingsByProfile } = useApi();
  const { authState } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await fetchBookingsByProfile(authState.user.name);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    getBookings();
  }, [authState.user.name]);

  return (
    <main className=' pt-28 bg-slate-50'>
      <Container>
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {bookings.map((booking) => (
            <Card key={booking.id} reservation={booking} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default MyBookingsPage;