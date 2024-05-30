'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './menu-item';
import AvatarImage from '@/components/avatar';
import { useCallback, useState, useEffect } from 'react';
import SignUpModal from '@/components/modals/sign-up_modal';
import LoginModal from '@/components/modals/login-modal';
import { useAuth } from '@/components/providers/auth_context';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
  const { authState, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const toggleOpen = useCallback(
    () => setIsOpen((isOpen) => !isOpen),
    []
  );
  const router = useRouter();

  useEffect(() => {
    if (!authState.user) {
      setIsSignUpOpen(false);
      setIsLoginOpen(false);
    }
  }, [authState.user]);

  const handleNavigation = useCallback(
    (path) => {
      router.push(path);
      setIsOpen(false); // Close the menu after navigation
    },
    [router]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
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
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {authState.user ? (
              <>
                <MenuItem onClick={() => handleNavigation("/venues")} label="View Venues" />
                <MenuItem onClick={() => handleNavigation("/my-bookings")} label="My Bookings" />
                <MenuItem onClick={() => handleNavigation("/manage-venues")} label="Manage Venues" />
                <MenuItem onClick={() => handleNavigation("/update-avatar")} label="Update Avatar" />
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
    </div>
  );
};

export default UserMenu;
