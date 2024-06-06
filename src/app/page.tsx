'use client';
import Hero from '@/components/hero';
import Venues from './venues/page';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="m-2">
      <main className="bg-slate-50 py-3 rounded-[36px] m-auto max-w-[1780px]">
        <Suspense fallback={<div>Loading...</div>}>
          <Hero />
          <section className="bg-slate-100 mt-1 rounded-[36px] m-auto">
            <Venues />
          </section>
        </Suspense>
      </main>
    </div>
  );
}
