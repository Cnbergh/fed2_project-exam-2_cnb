'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import toast from 'react-hot-toast';
import { useApi } from '../../api/api';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser, loginUser } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      venueManager: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (!data.email.endsWith('@stud.noroff.no')) {
      toast.error('You must register with a stud.noroff.no email address');
      setIsLoading(false);
      return;
    }
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        venueManager: data.venueManager,
      });
      toast.success('Account created successfully');

      // Log in the user after successful registration
      await loginUser({
        email: data.email,
        password: data.password,
      });
      toast.success('Logged in successfully');

      onClose();
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors && errorData.errors.length > 0) {
            errorMessage = errorData.errors[0].message;
          }
        } catch (e) {
          console.error('Failed to parse error message:', e);
        }
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Sign Up">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <input
                id="email"
                disabled={isLoading}
                {...register('email', { required: true })}
                placeholder="Email"
              />
              <input
                id="name"
                disabled={isLoading}
                {...register('name', { required: true })}
                placeholder="Name"
              />
              <input
                id="password"
                type="password"
                disabled={isLoading}
                {...register('password', { required: true })}
                placeholder="Password"
              />
              <label>
                <input type="checkbox" {...register('venueManager')} />
                Register as Venue Manager
              </label>
            </div>
            <div className="mt-4">
              <button type="submit" disabled={isLoading} className="bg-teal-500 text-white font-bold py-2 px-4 rounded w-full">
                Continue
              </button>
            </div>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default SignUpModal;
