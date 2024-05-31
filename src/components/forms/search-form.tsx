'use client';

import React, { useState } from 'react';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const { searchVenues } = useApi();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchVenues({ query, location, dateFrom, dateTo, guests });
      console.log('Search results:', results);
      router.push(`/venues?query=${query}&location=${location}&dateFrom=${dateFrom}&dateTo=${dateTo}&guests=${guests}`);
    } catch (error) {
      console.error('Error searching venues:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Where" value={query} onChange={(e) => setQuery(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" placeholder="From" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
      <input type="date" placeholder="To" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      <input type="number" placeholder="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
