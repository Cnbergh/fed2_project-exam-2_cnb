'use client';

import React from 'react';
interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}
interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Bookings for Selected Venue</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this venue.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-2 rounded">
              <p className="font-bold">Booking ID: {booking.id}</p>
              <p>Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p>Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
              <p>Guests: {booking.guests}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
