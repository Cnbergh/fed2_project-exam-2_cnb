'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useApi } from '@/api/api';
import VenueList from './venue-list';
import BookingList from './booking-list';
import { useAuth } from '@/components/providers/auth_context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CreateVenueModal from '@/components/modals/create-venue_modal';

const VenueManagerDashboard = () => {
  const { authState } = useAuth();
  const { fetchVenuesByProfile, fetchBookingsByVenue } = useApi();
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isCreateVenueOpen, setIsCreateVenueOpen] = useState(false);
  const router = useRouter();

  const fetchVenues = useCallback(async () => {
    if (!authState.user) {
      toast.error('You need to be logged in to view this page.');
      router.push('/');
      return;
    }

    try {
      const response = await fetchVenuesByProfile(authState.user.name);
      setVenues(response);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch venues.');
    }
  }, [authState.user, fetchVenuesByProfile, router]);

  useEffect(() => {
    if (authState.user?.name) {
      fetchVenues();
    }
  }, [fetchVenues, authState.user?.name]);

  const handleVenueClick = useCallback(async (venueId) => {
    setSelectedVenueId(venueId);
    try {
      const response = await fetchBookingsByVenue(venueId);
      setBookings(response);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch bookings.');
    }
  }, [fetchBookingsByVenue]);

  const handleCreateVenueClick = () => {
    setIsCreateVenueOpen(true);
  };

  return (
    <div className="venue-manager-dashboard">
      <h1 className="text-2xl font-bold mb-4">Venue Manager Dashboard</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleCreateVenueClick}
      >
        Create Venue
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">My Venues</h2>
        <VenueList venues={venues} onVenueClick={handleVenueClick} />
      </div>
      {selectedVenueId && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Bookings for Selected Venue</h2>
          <BookingList bookings={bookings} />
        </div>
      )}
      <CreateVenueModal
        isOpen={isCreateVenueOpen}
        onClose={() => setIsCreateVenueOpen(false)}
      />
    </div>
  );
};

export default VenueManagerDashboard;
