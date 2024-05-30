'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const EditVenuePage = ({ params }) => {
  const { id } = params;
  const { register, handleSubmit, setValue } = useForm();
  const { fetchVenueById, updateVenue } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getVenue = async () => {
      try {
        const venueData = await fetchVenueById(id);
        setValue('name', venueData.name);
        setValue('description', venueData.description);
        setValue('price', venueData.price);
        setValue('maxGuests', venueData.maxGuests);
        setValue('media[0].url', venueData.media[0]?.url);
        setValue('media[0].alt', venueData.media[0]?.alt);
      } catch (error) {
        console.error('Failed to fetch venue:', error);
      }
    };

    getVenue();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateVenue(id, data);
      router.push(`/venues/${id}`);
    } catch (error) {
      console.error('Failed to update venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('description', { required: true })} placeholder="Description" />
        <input {...register('price', { required: true })} placeholder="Price" type="number" />
        <input {...register('maxGuests', { required: true })} placeholder="Max Guests" type="number" />
        <input {...register('media[0].url')} placeholder="Media URL" />
        <input {...register('media[0].alt')} placeholder="Media Alt Text" />
        <button type="submit" disabled={isLoading}>Update Venue</button>
      </form>
    </div>
  );
};

export default EditVenuePage;
