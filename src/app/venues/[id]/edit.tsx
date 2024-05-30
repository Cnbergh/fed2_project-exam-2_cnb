import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '@/lib/fetcher';
import { API_URL } from '@/api/constants';
import { useForm } from 'react-hook-form';

const EditVenue = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchVenue = async () => {
        try {
          const data = await fetcher(`${API_URL}/holidaze/venues/${id}`);
          setValue('name', data.name);
          setValue('description', data.description);
          setValue('price', data.price);
          setValue('maxGuests', data.maxGuests);
        } catch (error) {
          console.error('Failed to fetch venue:', error);
        }
      };
      fetchVenue();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await fetcher(`${API_URL}/holidaze/venues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      router.push(`/venues/${id}`);
    } catch (error) {
      console.error('Failed to update venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await fetcher(`${API_URL}/holidaze/venues/${id}`, {
        method: 'DELETE',
      });
      router.push('/venues');
    } catch (error) {
      console.error('Failed to delete venue:', error);
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
      <button type="submit" disabled={isLoading}>Update Venue</button>
      <button type="button" onClick={onDelete} disabled={isLoading}>Delete Venue</button>
    </form>
  );
};

export default EditVenue;
