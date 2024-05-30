'use client';
import * as Avatar from '@radix-ui/react-avatar';
import { useAuth } from './providers/auth_context';

const AvatarImage = () => {
  const { authState } = useAuth();
  const avatarUrl = authState?.user?.avatar?.url || '/images/placeholder.jpg';
  const avatarAlt = authState?.user?.avatar?.alt || 'Profile picture';

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
