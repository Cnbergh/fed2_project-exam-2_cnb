'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import UpdateAvatar from '@/components/profile/update_avatar';

interface UpdateAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateAvatarModal: React.FC<UpdateAvatarModalProps> = ({ isOpen, onClose }) => {
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
