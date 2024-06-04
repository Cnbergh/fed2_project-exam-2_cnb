'use client';

import { useState } from 'react';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useApi } from '@/api/api';

interface VenueFormInputs {
  name: string;
  description: string;
  mediaUrl: string;
  mediaAlt: string;
  price: string; // Change to string
  maxGuests: string; // Change to string
  rating: string; // Change to string
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: string; // Change to string
  lng: string; // Change to string
}

const CreateVenueModal = ({ isOpen, onClose }) => {
  const { createVenue } = useApi();
  const { register, handleSubmit, reset } = useForm<VenueFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<VenueFormInputs> = async (data) => {
    setLoading(true);
    try {
      const venueData = {
        name: data.name,
        description: data.description,
        media: data.mediaUrl ? [{ url: data.mediaUrl, alt: data.mediaAlt }] : [],
        price: parseFloat(data.price), // Convert to number
        maxGuests: parseInt(data.maxGuests, 10), // Convert to number
        rating: parseFloat(data.rating) || 0, // Convert to number, default to 0
        meta: {
          wifi: data.wifi,
          parking: data.parking,
          breakfast: data.breakfast,
          pets: data.pets,
        },
        location: {
          address: data.address || null,
          city: data.city || null,
          zip: data.zip || null,
          country: data.country || null,
          continent: data.continent || null,
          lat: parseFloat(data.lat) || 0, // Convert to number, default to 0
          lng: parseFloat(data.lng) || 0, // Convert to number, default to 0
        },
      };

      await createVenue(venueData);
      toast.success('Venue created successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to create venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Create Venue">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <input {...register('name', { required: true })} placeholder="Venue Name" />
              <textarea {...register('description', { required: true })} placeholder="Description" />
              <input {...register('mediaUrl')} placeholder="Media URL (optional)" />
              <input {...register('mediaAlt')} placeholder="Media Alt Text (optional)" />
              <input type="number" {...register('price', { required: true })} placeholder="Price" />
              <input type="number" {...register('maxGuests', { required: true })} placeholder="Max Guests" />
              <input type="number" {...register('rating')} placeholder="Rating (optional)" />
              <label>
                <input type="checkbox" {...register('wifi')} />
                Wifi (optional)
              </label>
              <label>
                <input type="checkbox" {...register('parking')} />
                Parking (optional)
              </label>
              <label>
                <input type="checkbox" {...register('breakfast')} />
                Breakfast (optional)
              </label>
              <label>
                <input type="checkbox" {...register('pets')} />
                Pets (optional)
              </label>
              <input {...register('address')} placeholder="Address (optional)" />
              <input {...register('city')} placeholder="City (optional)" />
              <input {...register('zip')} placeholder="Zip (optional)" />
              <input {...register('country')} placeholder="Country (optional)" />
              <input {...register('continent')} placeholder="Continent (optional)" />
              <input type="number" {...register('lat')} placeholder="Latitude (optional)" />
              <input type="number" {...register('lng')} placeholder="Longitude (optional)" />
              <div className="mt-4">
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Venue'}
                </button>
              </div>
            </div>
            <ModalClose onClick={onClose} />
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default CreateVenueModal;
