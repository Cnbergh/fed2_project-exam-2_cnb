'use client'
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Container from './container';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-md">
      <Container>
      <div className="relative">
        <AspectRatio.Root ratio={16 / 9}>
          <img
            src="/images/mesut-kaya-eOcyhe5-9sQ-unsplash.jpg"
            className="rounded-3xl h-full w-full object-fit"
            alt="Hero Image"
          />
        <div className='absolute bottom-0 left-0 w-3/4 sm:w-2/3 lg:w-1/2 p-4 '>
          <h1 className='text-white text-xl sm:text-3xl md:text-5xl lg:text-6xl'>
          Plan a trip with help from local Hosts around the world
          </h1>
        </div>
        </AspectRatio.Root>
        </div>
      </Container>
    </section>
  );
}
