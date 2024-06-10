// src/app/venues/page.tsx

import dynamic from 'next/dynamic';
import Container from '@/components/container';
import { Suspense } from 'react';

const ClientVenues = dynamic(() => import('@/components/ClientVenues'), { ssr: false });

const VenuesPage = () => {
  return (
    <div className='m-2'>
      <main className="pt-16 bg-slate-50 rounded-3xl mx-auto max-w-[1780px]">
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientVenues />
          </Suspense>
        </Container>
      </main>
    </div>
  );
};

export default VenuesPage;
