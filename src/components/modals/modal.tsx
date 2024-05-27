
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { ReactNode, forwardRef, ForwardedRef } from 'react';

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export default function Modal({  open, onOpenChange, children, }: ModalProps) {
  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</DialogPrimitive.Root>;
}

interface ModalContentProps {
  title: string;
  children: ReactNode;
}

const ModalContent = forwardRef(function ModalContent(
  { title, children, ...props }: ModalContentProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]"
      >
        <div className="flex items-center justify-between">
          <DialogPrimitive.Title className="text-xl">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close aria-label="Close" className="text-gray-400 hover:text-gray-500">
            <Cross1Icon />
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

const ModalButton = DialogPrimitive.Trigger;
const ModalClose = DialogPrimitive.Close;
const ModalOverlay = DialogPrimitive.Overlay

export { ModalButton, ModalOverlay, ModalContent, ModalClose };
