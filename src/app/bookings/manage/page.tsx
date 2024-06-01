'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import Container from '@/components/container';
import BookingCard from '@/components/ui/booking-card';

const ManageVenueBookingsPage = () => {
  const { id } = useParams();
  const { fetchBookingsByProfile } = useApi();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await fetchBookingsByProfile(id);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    getBookings();
  }, [id]);

  return (
    <main className=' pt-28 bg-slate-50'>
      <Container>
        <h1 className="text-3xl font-bold mb-8">Bookings for Venue {id}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {bookings.map((booking) => (
            <div key={booking.id} booking={booking} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default ManageVenueBookingsPage;
