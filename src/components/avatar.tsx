'use client';
import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { useAuth } from './providers/auth_context';

const AvatarImage = () => {
  const { authState } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('/images/placeholder.jpg');
  const [avatarAlt, setAvatarAlt] = useState('Profile picture');

  useEffect(() => {
    console.log('Auth state in AvatarImage:', authState);
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    const storedAvatarAlt = localStorage.getItem('avatarAlt');
    
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    } else if (authState?.user?.avatar?.url) {
      setAvatarUrl(authState.user.avatar.url);
    } else {
      setAvatarUrl('/images/placeholder.jpg');
    }

    if (storedAvatarAlt) {
      setAvatarAlt(storedAvatarAlt);
    } else if (authState?.user?.avatar?.alt) {
      setAvatarAlt(authState.user.avatar.alt);
    } else {
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
