'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import { useState } from 'react';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';
import toast from 'react-hot-toast';

const BecomeHostModal = ({ isOpen, onClose }) => {
  const { authState, saveUserData } = useAuth();
  const { updateProfile } = useApi();
  const [loading, setLoading] = useState(false);

  const handleBecomeHost = async () => {
    setLoading(true);
    try {
      if (authState.user.venueManager) {
        toast('You are already a venue manager.', { icon: 'ℹ️' });
        setLoading(false);
        onClose();
        return;
      }
      
      const profileData = { venueManager: true };
      const response = await updateProfile(authState.user.name, profileData);
      console.log('Profile update response:', response);
      saveUserData({ ...authState, user: { ...authState.user, venueManager: true } });
      toast.success('You are now a venue manager!');
      onClose();
    } catch (error) {
      console.error('Failed to become host:', error);
      // Extract and display the message from the API error response
      const errorMessage = error.message || (error.errors && error.errors[0].message) || 'Failed to update profile.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Become a Host">
          <div className="flex flex-col space-y-4">
            <p>Are you sure you want to become a host? This will allow you to manage your own venues.</p>
            <button
              onClick={handleBecomeHost}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Yes, Become a Host'}
            </button>
          </div>
          <ModalClose>
            <Cross1Icon />
          </ModalClose>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default BecomeHostModal;
