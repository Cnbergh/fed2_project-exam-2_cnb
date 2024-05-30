import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useAuth } from '@/components/providers/auth_context';

const UpdateAvatar = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { authState, saveUserData } = useAuth();
  const { updateProfile } = useApi();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateProfile(authState.user.name, {
        avatar: { url: data.url, alt: data.alt },
      });
      saveUserData({ ...authState, user: { ...authState.user, avatar: response.data.avatar } });
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
