'use client';
import * as Avatar from '@radix-ui/react-avatar';


const AvatarImage = () => {
    return (
        <Avatar.Root className="bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src="/images/placeholder.jpg"
          alt="profile picture"
        />
        <Avatar.Fallback
          className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          P
        </Avatar.Fallback>
      </Avatar.Root>
    );
}

export default AvatarImage;