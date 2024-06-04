'use client'
import React, { useState } from 'react';
import { useAuth } from '../providers/auth_context';
import { useApi } from '@/api/api';

const UpdateAvatar = () => {
  const { authState, saveUserData } = useAuth();
  const { updateProfile } = useApi();
  const [avatarUrl, setAvatarUrl] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      avatar: {
        url: avatarUrl,
        alt: 'avatar',
      },
    };
    console.log('Current Auth State in UpdateAvatar:', authState);
    console.log('Profile data to be updated:', profileData);

    try {
      const response = await updateProfile(authState.user.name, profileData);
      console.log('Profile update response:', response);

      // Update the auth state with the new avatar
      const updatedUser = { ...authState.user, avatar: profileData.avatar };
      saveUserData({ ...authState, user: updatedUser });
    } catch (error) {
      console.error('Failed to update avatar:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <button type="submit">Update Avatar</button>
    </form>
  );
};

export default UpdateAvatar;
