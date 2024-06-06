'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import toast from 'react-hot-toast';
import { useApi } from '../../api/api';
import { useAuth } from '../../components/providers/auth_context';
import { Cross1Icon } from "@radix-ui/react-icons";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useApi();
  const { saveUserData } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log('Login response:', response); // Debugging log
      saveUserData(response.data);
      toast.success('Logged in successfully');
      onClose();
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Login">
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
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                {...register('password', { required: true })}
                placeholder="Password"
              />
            </div>
            <div className="mt-4">
              <button type="submit" disabled={isLoading} className='bg-teal-500 text-white font-bold py-2 px-4 rounded w-full'>
                Login
              </button>
            </div>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default LoginModal;
