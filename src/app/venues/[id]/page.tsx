'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/api/api';
import Container from '@/components/container';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Calendar from '@/components/calender';
import { useForm } from 'react-hook-form';
import Modal, { ModalOverlay, ModalContent, ModalClose } from '@/components/modals/modal';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
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
      const bookingData = {
        ...data,
        guests: Number(data.guests),
        venueId: id,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString()
      };
      await createBooking(bookingData);
      setBookingDetails({
        venueName: venue.name,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString()
      });
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
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
            <input
              type="number"
              placeholder="Number of Guests"
              min={1}
              max={venue.maxGuests}
              {...register('guests', { required: 'Number of guests is required', valueAsNumber: true })}
              className="p-2 border rounded"
            />
            {errors.guests && <p className="text-red-500">{errors.guests.message}</p>}
            <button type="submit" className="mt-4 bg-teal-500 text-white font-bold py-2 px-4 rounded">
              Book Now
            </button>
          </form>
        </div>
      </Container>
      {showConfirmation && (
        <Modal open={showConfirmation} onOpenChange={handleCloseModal}>
          <ModalOverlay>
            <ModalContent title="Booking Confirmation">
              <div className="flex flex-col space-y-4">
                <p>Thank you for booking {bookingDetails.venueName}!</p>
                <p>Your booking is from {new Date(bookingDetails.dateFrom).toLocaleDateString()} to {new Date(bookingDetails.dateTo).toLocaleDateString()}.</p>
                <button
                  onClick={handleCloseModal}
                  className="bg-teal-500 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
              <ModalClose onClick={handleCloseModal}>Cancel</ModalClose>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </main>
  );
};

export default VenuePageId;
