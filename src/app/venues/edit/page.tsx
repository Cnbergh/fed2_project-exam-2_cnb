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

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      setIsLoading(true);
      try {
        await deleteVenue(id);
        router.push('/venues');
      } catch (error) {
        console.error('Failed to delete venue:', error);
      } finally {
        setIsLoading(false);
      }
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
    <button onClick={onDelete} disabled={isLoading} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded">
      Delete Venue
    </button>
  </div>
  );
};

export default EditVenuePage;
