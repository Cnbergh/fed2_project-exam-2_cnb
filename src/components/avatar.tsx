'use client';
import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { useAuth } from './providers/auth_context';

// Define the type for Avatar
interface AvatarType {
  url: string;
  alt: string;
}

// Define the type for User
interface UserType {
  avatar?: AvatarType;
}

// Define the type for AuthState
interface AuthStateType {
  user?: UserType;
}

const AvatarImage = () => {
  const { authState } = useAuth() as { authState: AuthStateType };
  const [avatarUrl, setAvatarUrl] = useState('/images/placeholder.jpg');
  const [avatarAlt, setAvatarAlt] = useState('Profile picture');

  useEffect(() => {
    console.log('Auth state in AvatarImage:', authState);
    if (authState?.user?.avatar?.url) {
      setAvatarUrl(authState.user.avatar.url);
      setAvatarAlt(authState.user.avatar.alt || 'Profile picture');
    } else {
      setAvatarUrl('/images/placeholder.jpg');
      setAvatarAlt('Profile picture');
    }
  }, [authState]);

  return (
    <Avatar.Root className="bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={avatarUrl}
        alt={avatarAlt}
      />
      <Avatar.Fallback
        className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        P
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AvatarImage;
