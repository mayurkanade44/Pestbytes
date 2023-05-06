"use client";

import { BiSearch } from "react-icons/bi";

type Props = {};
const Search = (props: Props) => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex  flex-row items-center justify-between pl-4">
        <div className="hidden text-sm sm:block">Search for blogs, pest or pest services</div>
        <div className="text-sm  font-semibold px-4">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};
export default Search;
