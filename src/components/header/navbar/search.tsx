'use client';
import { BiSearch } from "react-icons/bi";
const Search = () => {

  return (
    <div
     className=" border-[3px] w-full md:w-auto rounded-full shadow-sm hover:shadow-ms transition cursor-pointer">
      <div className="flex flex-row items-center justify-between py-1">
        <div className="text-sm font-semibold px-4 text-white">
          where
          </div>
        <div className="hidden lg:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center text-white">
          when
        </div>
        <div
          className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
            <div className="hidden lg:block text-white">
              who
            </div>
            <div className="p-2 bg-teal-500 rounded-full text-white">
                <BiSearch />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Search;