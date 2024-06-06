'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useApi } from '@/api/api';
import VenueList from './venue-list';
import BookingList from './booking-list';
import { useAuth } from '@/components/providers/auth_context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CreateVenueModal from '@/components/modals/create-venue_modal';
import EditVenueModal from '@/components/modals/edit-venue_modal';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const VenueManagerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { fetchVenuesByProfile, fetchBookingsByVenue, deleteVenue } = useApi();
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [isCreateVenueOpen, setIsCreateVenueOpen] = useState(false);
  const [isEditVenueOpen, setIsEditVenueOpen] = useState(false);
  const router = useRouter();

  const fetchVenues = useCallback(async () => {
    if (!authState.user) {
      toast.error('You need to be logged in to view this page.');
      router.push('/');
      return;
    }

    try {
      console.log('Fetching venues for user:', authState.user.name);
      const response = await fetchVenuesByProfile(authState.user.name);
      setVenues(response);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch venues.');
    }
  }, [authState.user, fetchVenuesByProfile, router]);

  useEffect(() => {
    if (authState.user?.name) {
      fetchVenues();
    }
  }, [authState.user?.name, fetchVenues]);

  const handleVenueClick = useCallback(async (venueId: string) => {
    setSelectedVenueId(venueId);
    try {
      const response = await fetchBookingsByVenue(venueId);
      setBookings(response);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch bookings.');
    }
  }, [fetchBookingsByVenue]);

  const handleCreateVenueClick = () => {
    setIsCreateVenueOpen(true);
  };

  const handleEditVenueClick = (venue: any) => {
    setSelectedVenueId(venue.id);
    setIsEditVenueOpen(true);
  };

  const handleDeleteVenueClick = async (venueId: string) => {
    try {
      await deleteVenue(venueId);
      toast.success('Venue deleted successfully!');
      fetchVenues(); // Refresh venues after deletion
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete venue.');
    }
  };

  const handleVenueCreatedOrUpdated = () => {
    fetchVenues();
  };

  return (
    <div className="flex flex-col p-4 w-full">
      <ScrollArea.Root className="w-full h-dvh rounded-2xl overflow-hidden">
        <ScrollArea.Viewport className="w-full h-full rounded">
          <h1 className="text-2xl font-bold mb-4">Host a venue</h1>
          <button
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-400 transition"
            onClick={handleCreateVenueClick}>
            Create Venue
          </button>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Your Venues</h2>
            <VenueList
              venues={venues}
              onVenueClick={handleVenueClick}
              onEditVenue={handleEditVenueClick}
              onDeleteVenue={handleDeleteVenueClick}
            />
          </div>
          {selectedVenueId && (
            <div className="mt-4">
              <BookingList bookings={bookings} />
            </div>
          )}
          <CreateVenueModal
            isOpen={isCreateVenueOpen}
            onClose={() => setIsCreateVenueOpen(false)}
            onVenueCreated={handleVenueCreatedOrUpdated}
          />
          {selectedVenueId && (
            <EditVenueModal
              isOpen={isEditVenueOpen}
              onClose={() => setIsEditVenueOpen(false)}
              venue={venues.find((venue) => venue.id === selectedVenueId)}
              onVenueUpdated={handleVenueCreatedOrUpdated}
            />
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical">
          <ScrollArea.Thumb className="flex-1 bg-gray-00 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5">
          <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className=" bg-gray-600" />
      </ScrollArea.Root>
    </div>
  );
};

export default VenueManagerDashboard;
