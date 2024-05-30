'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const NewVenuePage = () => {
  const { register, handleSubmit } = useForm();
  const { createVenue } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createVenue(data);
      router.push('/venues');
    } catch (error) {
      console.error('Failed to create venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('description', { required: true })} placeholder="Description" />
        <input {...register('price', { required: true })} placeholder="Price" type="number" />
        <input {...register('maxGuests', { required: true })} placeholder="Max Guests" type="number" />
        <input {...register('media[0].url')} placeholder="Media URL" />
        <input {...register('media[0].alt')} placeholder="Media Alt Text" />
        <button type="submit" disabled={isLoading}>Create Venue</button>
      </form>
    </div>
  );
};

export default NewVenuePage;
