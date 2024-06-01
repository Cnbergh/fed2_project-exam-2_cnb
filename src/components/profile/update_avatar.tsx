'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';

const UpdateAvatar = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { authState, saveUserData } = useAuth();
  const { updateProfile } = useApi();

  useEffect(() => {
    console.log('Current Auth State in UpdateAvatar:', authState);
  }, [authState]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateProfile(authState.user.name, {
        avatar: { url: data.url, alt: data.alt },
      });
      console.log('Update Avatar Response:', response);
      const updatedUser = { ...authState.user, avatar: response.data.avatar };
      saveUserData({ ...authState, user: updatedUser });
      localStorage.setItem('avatarUrl', response.data.avatar.url); // Save the new avatar URL to local storage
      localStorage.setItem('avatarAlt', response.data.avatar.alt); // Save the new avatar alt to local storage
      onClose();
    } catch (error) {
      console.error('Failed to update avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('url', { required: true })} placeholder="Avatar URL" />
      <input {...register('alt', { required: true })} placeholder="Avatar Alt Text" />
      <button type="submit" disabled={isLoading}>Update Avatar</button>
    </form>
  );
};

export default UpdateAvatar;
