'use client'
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Container from './container';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-md">
      <Container>
        <AspectRatio.Root ratio={16 / 9}>
          <img
            src="/images/mesut-kaya-eOcyhe5-9sQ-unsplash.jpg"
            className="rounded-3xl h-full w-full object-fit"
            alt="Hero Image"
          />
        </AspectRatio.Root>
      </Container>
    </section>
  );
}
