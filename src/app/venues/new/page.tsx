// NewVenuePage.js
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const NewVenuePage = () => {
  const { createVenue } = useApi();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createVenue(data);
      router.push('/manage-venues');
    } catch (error) {
      console.error('Failed to create venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      <textarea {...register('description', { required: true })} placeholder="Description" />
      <input {...register('price', { required: true })} placeholder="Price" type="number" />
      <input {...register('maxGuests', { required: true })} placeholder="Max Guests" type="number" />
      <input {...register('media[0].url')} placeholder="Media URL" />
      <input {...register('media[0].alt')} placeholder="Media Alt Text" />
      <button type="submit" disabled={isLoading}>Create Venue</button>
      {errors.name && <span>This field is required</span>}
      {errors.description && <span>This field is required</span>}
      {errors.price && <span>This field is required</span>}
      {errors.maxGuests && <span>This field is required</span>}
    </form>
  );
};

export default NewVenuePage;
