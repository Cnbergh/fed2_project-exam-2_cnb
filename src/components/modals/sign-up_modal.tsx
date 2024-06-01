'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import toast from 'react-hot-toast';
import { useApi } from '../../api/api';

const SignUpModal = ({ isOpen, onClose }) => {
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
      const loginResponse = await loginUser({
        email: data.email,
        password: data.password,
      });
      toast.success('Logged in successfully');

      onClose();
    } catch (error) {
      toast.error('Something went wrong');
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
                label="Email"
                disabled={isLoading}
                {...register('email', { required: true })}
                placeholder="Email"
              />
              <input
                id="name"
                label="Name"
                disabled={isLoading}
                {...register('name', { required: true })}
                placeholder="Name"
              />
              <input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                {...register('password', { required: true })}
                placeholder="Password"
              />
              <label>
                <input
                  type="checkbox"
                  {...register('venueManager')}
                />
                Register as Venue Manager
              </label>
            </div>
            <div className="mt-4">
              <button type="submit" disabled={isLoading}>
                Continue
              </button>
            </div>
            <ModalClose onClick={onClose}>Cancel</ModalClose>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default SignUpModal;
