'use client';
import Hero from '@/components/hero';
import Venues from './venues/page';
import { Suspense } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export default function Home() {
  return (
    <div className="m-2">
      <main className="bg-slate-50 py-3 rounded-[36px] m-auto max-w-[1780px]">
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollArea.Root className="w-full h-dvh rounded-2xl overflow-hidden">
            <ScrollArea.Viewport className="w-full h-full rounded-2xl">
              <Hero />
              <section className="bg-slate-100 mt-1 rounded-[36px] m-auto">
                <Venues />
              </section>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical">
              <ScrollArea.Thumb/>
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Suspense>
      </main>
    </div>
  );
}
