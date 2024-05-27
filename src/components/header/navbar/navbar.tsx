'use client';
import React from 'react';
import Logo from './logo';
import Search from './search';
import NavMenu from './nav-menu';
import UserMenu from './user-menu';

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="py-4">
        <div
          className="flex
            flex-row
          items-center
          justify-between
          gap-3
          md:gap-0">
          <div
            className="flex flex-row items-center
          justify-between
          gap-3
          md:gap-1">
            <Logo />
            <NavMenu />
          </div>
          <Search />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
