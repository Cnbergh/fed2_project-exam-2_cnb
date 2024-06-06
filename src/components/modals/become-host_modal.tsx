'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import { useState } from 'react';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';
import toast from 'react-hot-toast';
import { User } from '@/lib/types';

interface BecomeHostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BecomeHostModal: React.FC<BecomeHostModalProps> = ({ isOpen, onClose }) => {
  const { authState, saveUserData } = useAuth();
  const { updateProfile } = useApi();
  const [loading, setLoading] = useState(false);

  const handleBecomeHost = async () => {
    setLoading(true);
    try {
      if (authState.user?.venueManager) {
        toast('You are already a venue manager.', { icon: 'ℹ️' });
        setLoading(false);
        onClose();
        return;
      }
      
      const profileData = { venueManager: true };
      const response = await updateProfile(authState.user?.name as string, profileData);
      console.log('Profile update response:', response);
      
      const updatedUser: User = {
        ...authState.user,
        venueManager: true,
      };
      saveUserData({ ...authState, user: updatedUser });
      toast.success('You are now a venue manager!');
      onClose();
    } catch (error) {
      console.error('Failed to become host:', error);
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
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded w-full"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Yes, Become a Host'}
            </button>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default BecomeHostModal;
