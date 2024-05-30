import React, { useState } from 'react';
import fetcher from '@/lib/fetcher';
import { useForm } from 'react-hook-form';
import { API_URL } from '@/api/constants';
import { useRouter } from 'next/router';

const CreateVenue = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await fetcher(`${API_URL}/holidaze/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      router.push('/venues');
    } catch (error) {
      console.error('Failed to create venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      <input {...register('description', { required: true })} placeholder="Description" />
      <input {...register('price', { required: true })} placeholder="Price" type="number" />
      <input {...register('maxGuests', { required: true })} placeholder="Max Guests" type="number" />
      <button type="submit" disabled={isLoading}>Create Venue</button>
    </form>
  );
};

export default CreateVenue;
