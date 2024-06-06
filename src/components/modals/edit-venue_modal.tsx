'use client';

import { useState, useEffect } from 'react';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useApi } from '@/api/api';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface VenueFormInputs {
  name: string;
  description: string;
  mediaUrl: string;
  mediaAlt: string;
  price: string;
  maxGuests: string;
  rating: string; 
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: string;
  lng: string;
}

const EditVenueModal = ({ isOpen, venue, onClose, onVenueUpdated }) => {
  const { updateVenue } = useApi();
  const { register, handleSubmit, reset, setValue } = useForm<VenueFormInputs>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (venue) {
      setValue('name', venue.name);
      setValue('description', venue.description);
      setValue('mediaUrl', venue.media[0]?.url || '');
      setValue('mediaAlt', venue.media[0]?.alt || '');
      setValue('price', venue.price.toString());
      setValue('maxGuests', venue.maxGuests.toString());
      setValue('rating', venue.rating.toString());
      setValue('wifi', venue.meta.wifi);
      setValue('parking', venue.meta.parking);
      setValue('breakfast', venue.meta.breakfast);
      setValue('pets', venue.meta.pets);
      setValue('address', venue.location.address || '');
      setValue('city', venue.location.city || '');
      setValue('zip', venue.location.zip || '');
      setValue('country', venue.location.country || '');
      setValue('continent', venue.location.continent || '');
      setValue('lat', venue.location.lat.toString());
      setValue('lng', venue.location.lng.toString());
    }
  }, [venue, setValue]);

  const onSubmit: SubmitHandler<VenueFormInputs> = async (data) => {
    setLoading(true);
    try {
      const updatedVenue = {
        name: data.name,
        description: data.description,
        media: data.mediaUrl ? [{ url: data.mediaUrl, alt: data.mediaAlt }] : [],
        price: parseFloat(data.price),
        maxGuests: parseInt(data.maxGuests, 10),
        rating: parseFloat(data.rating) || 0,
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
          lat: parseFloat(data.lat) || 0,
          lng: parseFloat(data.lng) || 0,
        },
      };

      await updateVenue(venue.id, updatedVenue);
      toast.success('Venue updated successfully!');
      reset();
      onClose();
      onVenueUpdated();
    } catch (error) {
      toast.error('Failed to update venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Edit Venue">
        <ScrollArea.Root className="w-full h-[400px] rounded overflow-hidden">
        <ScrollArea.Viewport className="w-full h-full rounded">
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
                <button type="submit" disabled={loading} className='bg-teal-500 text-white font-bold py-2 px-4 rounded'>
                  {loading ? 'Updating...' : 'Update Venue'}
                </button>
              </div>
            </div>
            <ModalClose onClick={onClose} />
          </form>
          </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical">
          <ScrollArea.Thumb className="flex-1 bg-gray-00 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5">
          <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className=" bg-gray-600" />
      </ScrollArea.Root>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EditVenueModal;
