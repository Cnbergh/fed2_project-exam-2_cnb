'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import UpdateAvatar from '@/components/profile/update_avatar';

const UpdateAvatarModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Update Avatar">
          <UpdateAvatar onClose={onClose} />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default UpdateAvatarModal;
