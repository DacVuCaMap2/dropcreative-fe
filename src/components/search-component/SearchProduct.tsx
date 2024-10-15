import React from "react";
import SearchDropDown from "./SearchDropDown";
import { Search } from "lucide-react";

const SearchProduct = () => {
  return (
    <div className="flex flex-col">
      <div className="h-10 main-menu"></div>
      <div className="w-full h-10 mt-10 flex flex-col justify-center items-center space-y-2 p-5">
        <div className="w-full flex justify-center items-center">
          <SearchDropDown />
          <input
            placeholder="Search all assets"
            type="text"
            className="w-full py-2 outline-none border-none bg-gray-300"
          />
          <div className=" bg-white py-2 px-4 rounded-r">
            <button className="flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
