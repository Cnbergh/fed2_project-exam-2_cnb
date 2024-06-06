'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cross1Icon } from '@radix-ui/react-icons';
import Modal, { ModalOverlay, ModalContent, ModalClose } from './modal';
import Calendar from '@/components/calender';
import { RangeKeyDict, Range } from 'react-date-range';
import { useApi } from '@/api/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { searchVenues } = useApi();
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [guests, setGuests] = useState<number>(1);

  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges.selection as Range;
    setDateRange({
      startDate: range.startDate || new Date(),
      endDate: range.endDate || new Date(),
      key: 'selection',
    });
  };

  const handleSubmit = async () => {
    try {
      const results = await searchVenues({
        location,
        dateFrom: dateRange.startDate.toISOString(),
        dateTo: dateRange.endDate.toISOString(),
        guests,
      });
      console.log('Search results:', results);
      router.push(`/venues?location=${location}&dateFrom=${dateRange.startDate.toISOString()}&dateTo=${dateRange.endDate.toISOString()}&guests=${guests}`);
      onClose();
    } catch (error) {
      console.error('Error searching venues:', error);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalOverlay>
        <ModalContent title="Search Venues">
          <div className="flex flex-col space-y-4">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (City or Country)"
              className="p-2 border rounded"
            />
            <Calendar value={dateRange} onChange={handleSelect} />
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              placeholder="Guests"
              min={1}
              className="p-2 border rounded"
            />
            <button
              onClick={handleSubmit}
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default SearchModal;
