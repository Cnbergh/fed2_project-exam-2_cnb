// BookingForm.js
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const BookingForm = ({ venueId }) => {
  const { createBooking } = useApi();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createBooking({ ...data, venueId });
      router.push('/my-bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('dateFrom', { required: true })} placeholder="Start Date" type="date" />
      <input {...register('dateTo', { required: true })} placeholder="End Date" type="date" />
      <input {...register('guests', { required: true })} placeholder="Number of Guests" type="number" />
      <button type="submit" disabled={isLoading}>Book Now</button>
      {errors.dateFrom && <span>This field is required</span>}
      {errors.dateTo && <span>This field is required</span>}
      {errors.guests && <span>This field is required</span>}
    </form>
  );
};

export default BookingForm;
