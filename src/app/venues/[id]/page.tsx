'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/api/api';
import Container from '@/components/container';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Calendar from '@/components/calender';
import { useForm } from 'react-hook-form';

const VenuePageId = () => {
  const { id } = useParams();
  const { fetchVenueById, createBooking } = useApi();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const getVenue = async () => {
      try {
        setLoading(true);
        const venueData = await fetchVenueById(id);
        if (isMounted) {
          setVenue(venueData);
          if (venueData.bookings) {
            const dates = venueData.bookings.map(booking => new Date(booking.dateFrom));
            setBookedDates(dates);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch venue:', error);
          setFetchError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getVenue();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const onSubmit = async (data) => {
    try {
      await createBooking({
        ...data,
        venueId: id,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString()
      });
      router.push('/my-bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error fetching venue: {fetchError.message}</div>;
  }

  if (!venue) {
    return <div>No venue found</div>;
  }

  return (
    <main className="bg-slate-50 pt-8">
      <Container>
        <div className="relative">
          <AspectRatio.Root ratio={16 / 9}>
            <img
              src={venue.media[0]?.url || '/images/placeholder.jpg'}
              className="rounded-3xl h-full w-full object-cover"
              alt={venue.media[0]?.alt || 'Venue image'}
              fill={venue.media[0]?.fill ? venue.media[0].fill.toString() : 'false'}
            />
            <div className="absolute bottom-0 left-0 w-4/12 bg-white p-4 rounded-tr-3xl">
              <h1 className="text-black text-2xl font-bold">{venue.name}</h1>
              <p className="mt-2">{venue.description}</p>
              <p className="mt-2">Price: ${venue.price}</p>
              <p className="mt-2">Max Guests: {venue.maxGuests}</p>
              <button
                onClick={() => router.push(`/venues/edit/${id}`)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Venue
              </button>
            </div>
          </AspectRatio.Root>
        </div>
        <div className="mt-8">
          <Calendar
            value={dateRange}
            disabledDates={bookedDates}
            onChange={handleSelect}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="mt-4 bg-teal-500 text-white font-bold py-2 px-4 rounded">
              Book Now
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default VenuePageId;