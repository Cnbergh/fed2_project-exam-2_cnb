"use client";

import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import Modal, { ModalOverlay, ModalContent, ModalClose } from "./modal";
import { useEffect, useState } from 'react';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';

const MyBookingsModal = ({ isOpen, onClose }) => {
  const { fetchBookingsByProfile, deleteBooking } = useApi();
  const { authState } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const fetchBookings = async () => {
    try {
      if (authState.user?.name) {
        console.log("Fetching bookings for user:", authState.user.name);
        const response = await fetchBookingsByProfile(authState.user.name);
        console.log("Fetched bookings response:", response);
        
        if (Array.isArray(response)) {
          setBookings(response);
        } else if (response && response.data) {
          setBookings(response.data);
        } else {
          console.log("No data in response:", response);
        }
        setFetchError(null);
      } else {
        console.error("No user name found");
        setFetchError({ message: "No user name found" });
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setFetchError(error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      await fetchBookings();  // Refresh bookings after delete
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Current bookings state:", bookings);
  }, [bookings]);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="My Bookings">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">My Bookings</h2>
              <button 
                onClick={fetchBookings} 
                className="text-sm text-blue-500 hover:underline"
              >
                <ReloadIcon className="inline-block mr-1" /> Refresh
              </button>
            </div>
            {fetchError ? (
              <p>Error: {fetchError.message}</p>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <p>Booking ID: {booking.id}</p>
                    <p>Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                    <p>Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    <p>Guests: {booking.guests}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(booking.id)} 
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No upcoming bookings found.</p>
            )}
          </div>
          <ModalClose>
            <Cross1Icon />
          </ModalClose>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default MyBookingsModal;
