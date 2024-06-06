'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './menu-item';
import AvatarImage from '@/components/avatar';
import { useCallback, useState, useEffect } from 'react';
import SignUpModal from '@/components/modals/sign-up_modal';
import LoginModal from '@/components/modals/login-modal';
import UpdateAvatarModal from '@/components/modals/update-avatar_modal';
import MyBookingsModal from '@/components/modals/my-bookings_modal';
import BecomeHostModal from '@/components/modals/become-host_modal';
import { useAuth } from '@/components/providers/auth_context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const UserMenu = () => {
  const { authState, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isBecomeHostOpen, setIsBecomeHostOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const router = useRouter();

  const handleNavigation = useCallback((path: string) => {
    router.push(path);
    setIsOpen(false);
  }, [router]);

  const handleManageVenues = () => {
    if (!authState.user) {
      toast('You need to log in to manage venues.', { icon: 'ℹ️' });
      setIsLoginOpen(true);
    } else if (!authState.user.venueManager) {
      toast('You need to become a host to manage venues.', { icon: 'ℹ️' });
      setIsBecomeHostOpen(true);
    } else {
      handleNavigation('/dashboard');
    }
  };

  useEffect(() => {
    if (!authState.user) {
      setIsSignUpOpen(false);
      setIsLoginOpen(false);
      setIsUpdateAvatarOpen(false);
    }
  }, [authState.user]);

  const handleBecomeHost = () => {
    if (!authState.user) {
      setIsLoginOpen(true);
    } else {
      setIsBecomeHostOpen(true);
    }
  };

  return (
    <div className="relative bg-white rounded-3xl">
      <div className="flex items-center gap-3">
        <div
          onClick={handleBecomeHost}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Become a host
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <AvatarImage />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] lg:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {authState.user ? (
              <>
                <MenuItem onClick={() => handleNavigation("/venues")} label="View Venues" />
                <MenuItem onClick={() => setIsBookingsOpen(true)} label="My Bookings" />
                <MenuItem onClick={handleManageVenues} label="Manage Venues" />
                <MenuItem onClick={() => setIsUpdateAvatarOpen(true)} label="Update Avatar" />
                <hr />
                <MenuItem onClick={logoutUser} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => setIsLoginOpen(true)} label="Login" />
                <MenuItem onClick={() => setIsSignUpOpen(true)} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <UpdateAvatarModal isOpen={isUpdateAvatarOpen} onClose={() => setIsUpdateAvatarOpen(false)} />
      <MyBookingsModal isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
      <BecomeHostModal isOpen={isBecomeHostOpen} onClose={() => setIsBecomeHostOpen(false)} />
    </div>
  );
};

export default UserMenu;
