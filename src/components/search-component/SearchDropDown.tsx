"use client";
import { homeDrop1 } from "@/data/home-data/homeListData";
import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function SearchDropDown() {
  const [isOpen, setOpen] = useState(false);
  const listDropDown = homeDrop1;
  const selectItem = {
    drop1: listDropDown[0],
    drop2: "",
    drop3: true,
    drop4: false,
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Kiểm tra xem nhấp chuột có nằm ngoài dropdown hay không
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Xóa sự kiện lắng nghe khi component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="h-full relative border-r" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!isOpen)}
        className="bg-gray-300 flex items-center flex-row px-4 py-4 space-x-2 h-10 w-48 mt-2"
      >
        {selectItem.drop1.icon && <selectItem.drop1.icon size={16} />}
        <span className="flex-grow text-left truncate">
          {selectItem.drop1.name} {selectItem.drop2 && `,${selectItem.drop2}`}
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-30 text-sm bg-white w-full shadow-2xl top-16 rounded">
          <div className="border-b border-gray-300">
            {listDropDown &&
              listDropDown.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    selectItem.drop1.name === item.name && "text-blue-500"
                  } flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2`}
                >
                  {item.icon && <item.icon size={16} />}
                  <span className="flex-grow">{item.name}</span>
                  {selectItem.drop1.name === item.name && <Check size={16} />}
                </div>
              ))}
          </div>
          <div className="border-b">
            {selectItem &&
              selectItem.drop1.listSelect.map((item, index: number) => (
                <div
                  key={index}
                  className={`${
                    selectItem.drop2 === item.name && "text-blue-500"
                  } flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2`}
                >
                  {item.icon && <item.icon size={16} />}
                  <span className="flex-grow">{item.name}</span>
                  {selectItem.drop2 === item.name && <Check size={16} />}
                </div>
              ))}
          </div>
          <div className="border-b">
            {selectItem &&
              selectItem.drop1.listCheckbox.map((item, index: number) => (
                <div
                  key={index}
                  className={`flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    className="mr-2"
                  />
                  <span className="flex-grow">{item}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
