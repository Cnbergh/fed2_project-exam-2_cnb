'use client';

import { useRouter } from "next/navigation";
import * as Avatar from '@radix-ui/react-avatar';

const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex pl-3 pt-2">
    <Avatar.Root className="bg-white inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="cursor-pointer rounded-[inherit] object-cover"
        height="100"
        width="100"
        src="/images/logo-venue.png"
        />
        <Avatar.Fallback
        className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        H
      </Avatar.Fallback>
    </Avatar.Root>
    </div>
  )
}

export default Logo;