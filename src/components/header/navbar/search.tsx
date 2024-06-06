'use client';

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchModal from '../../modals/search_modal';

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border-[3px] w-full md:w-auto rounded-full shadow-sm hover:shadow-ms transition cursor-pointer bg-teal-600">
      <div className="flex flex-row items-center justify-between py-1" onClick={() => setIsModalOpen(true)}>
        <div className="text-sm font-semibold px-4 text-white"><p>where</p></div>
        <div className="hidden lg:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center text-white">
          <p>when</p>
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden lg:block text-white"><p>who</p></div>
          <div className="p-2 bg-teal-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Search;
