/* 'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Modal, { ModalButton,ModalContent, ModalClose } from "./modal";
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';

const SignUpModalProd = () => {
  return (
    <>

    <Modal>
    <ModalButton>Open Modal</ModalButton>
    <Dialog.Overlay> why do I need this?????????!!!!!!!!
    <ModalContent title="Modal Title">
      test
    </ModalContent>
    </Dialog.Overlay>
  </Modal>


    <Dialog.Root>
      <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
        Sign up
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow-lg">
          <h2 className="text-xl">Test</h2>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">
            <Cross1Icon />
          </Dialog.Close>
          test
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </>
  );
};

export default SignUpModalProd;
 */