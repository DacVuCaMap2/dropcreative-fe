"use client";
import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import {
  ArrowLeftFromLine,
  FileTerminal,
  Image,
  Scan,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button, Input, Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: <p className="text-sm font-semibold text-black">Asset type</p>,
    children: [
      {
        key: "g1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13", label: "Option 13" },
      { key: "14", label: "Option 14" },
    ],
  },
];

const SearchProduct = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  return (
    <div className="flex flex-col">
      <div className="h-14 main-menu"></div>
      <div className="w-full h-16 flex flex-col justify-center items-center space-y-2 mb-1">
        <div className="w-full flex justify-center items-center relative p-5">
          <SearchDropDown />
          <Input
            placeholder="Search all assets"
            type="text"
            className="w-11/12 py-2 border-none h-full bg-gray-200 hover:border-0 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:border-0"
          />
          <button className="absolute right-10 flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </div>
      <hr />
      <div className="w-full flex">
        {isOpenFilter ? (
          <div>
            <div className="h-16 text-sm font-semibold px-6 text-gray-600 flex items-center border border-r border-l-0 border-t-0 justify-between">
              <div className="flex gap-2 items-center">
                <SlidersHorizontal width={15} height={15} />
                <span>Filter</span>
              </div>
              <ArrowLeftFromLine
                className="cursor-pointer"
                width={18}
                height={18}
                onClick={() => setIsOpenFilter(false)}
              />
            </div>
            <Menu
              style={{
                width: 256,
                flexGrow: 1,
                overflowY: "auto",
                height: 730,
                overflow: "auto",
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex gap-5 px-5 overflow-hidden mt-4">
          <Button
            className="h-10 font-semibold bg-gray-200 hover:bg-gray-200"
            color="default"
            variant="filled"
            iconPosition="start"
            icon={<SlidersHorizontal width={15} height={15} />}
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            Filters
          </Button>
          <Button
            className="h-10 font-semibold"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Image width={15} height={15} />}
          >
            Photos
          </Button>
          <Button
            className="h-10 font-semibold"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Scan width={15} height={15} />}
          >
            Vectors
          </Button>
          <Button
            className="h-10 font-semibold"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<FileTerminal width={15} height={15} />}
          >
            PSD
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Cream color
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Background
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            White backgound
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Black backgound
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Zoom backgound
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Blue backgound
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Abstract backgound
          </Button>
          <Button
            className="h-10"
            color="default"
            variant="outlined"
            iconPosition="start"
            icon={<Search width={15} height={15} />}
          >
            Modern backgound
          </Button>
          {/* <p className="text-center mt-10 font-semibold text-2xl">
            Background Design Images
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
