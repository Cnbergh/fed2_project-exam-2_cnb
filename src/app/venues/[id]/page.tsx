'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/api/api';
import Container from '@/components/container';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Calendar from '@/components/calender';
import { useForm } from 'react-hook-form';
import Modal, {
  ModalOverlay,
  ModalContent,
  ModalClose,
} from '@/components/modals/modal';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const VenuePageId = () => {
  const { id } = useParams() as {id: string };
  const { fetchVenueById, createBooking } = useApi();
  const [venue, setVenue] = useState<any>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
            const dates = venueData.bookings.map(
              (booking: any) => new Date(booking.dateFrom)
            );
            setBookedDates(dates);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch venue:', error);
          setFetchError(error as Error);
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

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  const onSubmit = async (data: any) => {
    try {
      const bookingData = {
        ...data,
        guests: Number(data.guests),
        venueId: id,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString(),
      };
      await createBooking(bookingData);
      setBookingDetails({
        venueName: venue.name,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString(),
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
    <div className="m-2">
        <ScrollArea.Root className="w-full h-dvh rounded-2xl overflow-hidden">
        <ScrollArea.Viewport className="w-full h-full rounded">
      <main className="pt-20 bg-slate-50 rounded-3xl">
        <Container>
          <AspectRatio.Root ratio={16 / 9}>
            <img
              src={venue.media[0]?.url || '/images/placeholder.jpg'}
              className="rounded-3xl h-full w-full object-cover"
              alt={venue.media[0]?.alt || 'Venue image'}
              fill={
                venue.media[0]?.fill ? venue.media[0].fill.toString() : 'false'
              }
            />
          </AspectRatio.Root>
          <div className=" flex flex-col sm:flex-row mt-8 justify-between w-full">
            <div className=" w-full bg-white p-4 rounded-3xl m-1">
              <h1 className="text-black text-2xl font-bold">{venue.name}</h1>
              <p className="mt-2">{venue.description}</p>
              <p className="mt-2">Price: ${venue.price}</p>
              <p className="mt-2">Max Guests: {venue.maxGuests}</p>
            </div>
            <div className="flex flex-col bg-white rounded-3xl m-1">
              <Calendar
                value={dateRange}
                disabledDates={bookedDates}
                onChange={handleSelect}
              />
              <div className="mx-10 mb-1 flex flex-row w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    placeholder="Number of Guests"
                    min={1}
                    max={venue.maxGuests}
                    {...register('guests', {
                      required: 'Number of guests is required',
                      valueAsNumber: true,
                    })}
                    className="p-2 border rounded w-1/3 "
                  />
                  {errors.guests && (
                    <p className="text-red-500">{errors.guests.message}</p>
                  )}
                  <button
                    type="submit"
                    className="w-1/2 ml-10 bg-teal-500 text-white font-bold py-2 px-4 rounded">
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
        {showConfirmation && (
          <Modal open={showConfirmation} onOpenChange={handleCloseModal}>
            <ModalOverlay>
              <ModalContent title="Booking Confirmation">
                <div className="flex flex-col space-y-4">
                  <p>Thank you for booking {bookingDetails.venueName}!</p>
                  <p>
                    Your booking is from{' '}
                    {new Date(bookingDetails.dateFrom).toLocaleDateString()} to{' '}
                    {new Date(bookingDetails.dateTo).toLocaleDateString()}.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="bg-teal-500 text-white font-bold py-2 px-4 rounded w-full">
                    Close
                  </button>
                </div>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        )}
      </main>
      </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-gray-00 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
    >
      <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className=" bg-gray-600" />
    </ScrollArea.Root>
    </div>
  );
};

export default VenuePageId;
