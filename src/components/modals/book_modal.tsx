"use client";

import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import Modal, { ModalButton, ModalOverlay, ModalContent, ModalClose } from "./modal";


const BookModal = () => {
  return (
    <>
 <Modal>
    <ModalButton>Open Modal</ModalButton>
    <ModalOverlay>
    <ModalContent title="Modal Title"> 
    Lets see if this works
    <ModalClose><Cross1Icon /></ModalClose>
    </ModalContent>
    </ModalOverlay>
  </Modal>
  </>
  );
};

export default BookModal;
