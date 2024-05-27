'use client';
import React from "react";
import Container from "../container";
import Navbar from "./navbar/navbar";

const Header = () => {

  return (
    <header className="fixed w-full bg-transparent z-10">
      <div className='py-4'>
        <Container>
            <Navbar />
        </Container>
      </div>
    </header>
  );
};

export default Header;