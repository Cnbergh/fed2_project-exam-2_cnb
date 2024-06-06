'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApi } from '@/api/api';
import Card from '@/components/ui/card';
import Container from '@/components/container';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;}

const VenuesPage = () => {
  const { fetchVenues, searchVenues } = useApi();
  const [venues, setVenues] = useState<Venue[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getVenues = async () => {
      try {
        if (searchParams) {
          const location = searchParams.get('location');
          const dateFrom = searchParams.get('dateFrom');
          const dateTo = searchParams.get('dateTo');
          const guests = searchParams.get('guests');
          let venuesData;

          if (location || dateFrom || dateTo || guests) {
            venuesData = await searchVenues({ location, dateFrom, dateTo, guests });
          } else {
            venuesData = await fetchVenues();
          }

          setVenues(venuesData);
        }
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };

    getVenues();
  }, [searchParams]);

  return (
    <div className='m-2'>
      <main className="pt-16 bg-slate-50 rounded-3xl mx-auto">
        <Container>
          <ScrollArea.Root className="w-full h-dvh rounded-2xl overflow-hidden">
            <ScrollArea.Viewport className="w-full h-full rounded">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {venues.map((venue) => (
                  <Card
                    key={venue.id}
                    venue={venue}
                    reservation={null} // Provide a default value if not available
                    onAction={() => {}} // Provide a default empty function
                    disabled={false} // Provide a default value
                    actionLabel="" // Provide a default empty string
                  />
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-gray-00 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            >
              <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className=" bg-gray-600" />
          </ScrollArea.Root>
        </Container>
      </main>
    </div>
  );
};

export default VenuesPage;
