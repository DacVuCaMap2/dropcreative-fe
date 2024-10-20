"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import {
  ArrowLeftFromLine,
  Check,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button, Collapse, Input, message, Switch, Tag } from "antd";
import SearchResult from "./SearchResult";
import {
  generalCategoriesSelect,
  generalHolidayList,
  generalSeasonList,
} from "@/data/generalData";
import { SelectOption } from "@/types/common";
import { searchProduct } from "@/api/SearchApi";
import InputSearchComponent from "../general-component/InputSearchComponent";
import SearchForm, { getNewSearchForm } from "@/model/SearchForm";
// import SearchResult from "./SearchResult";

const SearchProduct = () => {
  const [keySearch, setKeySearch] = useState('');
  const { Panel } = Collapse;
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [filters, setFilters] = useState<any>([]);
  const [dataSearch,setDataSearch] = useState<SearchForm>(getNewSearchForm());

  const handleClose = (removedFilter: any) => {

  };
  const hanldeClearAll = () => {
    setFilters([]);
  };
  return (
    <div className="realative flex flex-col gap-2">
      <div className="h-14 main-menu"></div>
      <div className="px-8 sticky top-10 z-40">
        <InputSearchComponent keySearch={keySearch} setKeySearch={setKeySearch} type={1} />
      </div>



      <div className="w-full mt-3 px-5">
        <div className={`${isOpenFilter ? "flex" : ""}`}>
          {isOpenFilter ? (
            ""
          ) : (
            <Button
              className="h-10 font-semibold bg-gray-200 hover:bg-gray-200 flex items-center"
              color="default"
              variant="filled"
              iconPosition="start"
              icon={<SlidersHorizontal width={15} height={15} />}
              onClick={() => setIsOpenFilter(!isOpenFilter)}
            >
              Filters
            </Button>
          )}

          {isOpenFilter ? (
            <>
              <div className="w-1/6">
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

                {filters.length ? (
                  <div>
                    <div className="flex flex-col gap-2 text-sm font-semibold px-6 text-gray-600  border border-r border-l-0 border-t-0 pt-2 pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <span>Apply filter</span>
                        </div>
                        <div
                          className="flex gap-2 text-xs text-gray-400 cursor-pointer mt-1"
                          onClick={hanldeClearAll}
                        >
                          <span>Clear all</span>
                          <X width={12} height={12} className="mt-0.5 " />
                        </div>
                      </div>
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {filters.map((item: any, index: number) => (
                          <Tag
                            key={index}
                            closable
                            color="#3F83F8"
                            onClose={() => handleClose(item)}
                            className="text-white w-fit p-1 flex"
                          >
                            {item.title}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <Collapse
                    defaultActiveKey={["1"]}
                    ghost
                    expandIconPosition="end"
                  >

                    <Panel
                      header={
                        <span className="text-sm font-semibold">Category</span>
                      }
                      key="1"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {generalCategoriesSelect.map((item) => (
                          <Button
                            color="default"
                            className={`${filters?.includes(item)
                              ? "bg-blue-500 text-white "
                              : "bg-gray-200 text-black"
                              }`}
                            key={item.value}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">Season</span>
                      }
                      key="2"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {generalSeasonList.map((item) => (
                          <Button
                            color="default"
                            className={`${dataSearch.season?.includes(item.title)
                              ? "bg-blue-500 text-white "
                              : "bg-gray-200 text-black"
                              }`}
                            key={item.value}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">Holiday</span>
                      }
                      key="3"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {generalHolidayList.map((item) => (
                          <Button
                            color="default"
                            className={`${dataSearch.holiday?.includes(item.title)
                              ? "bg-blue-500 text-white "
                              : "bg-gray-200 text-black"
                              }`}
                            key={item.value}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">License</span>
                      }
                      key="4"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {/* <Button
                          color="default"
                          className={`${dataSearch?.includes(item)
                            ? "bg-blue-500 text-white "
                            : "bg-gray-200 text-black"
                            }`}
                          key={item.value}
                        >
                          {item.title}
                        </Button> */}
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className={`${isOpenFilter ? "w-5/6" : ""}  mt-4`}>
            {/* <SearchResult dataSearch={dataSearch} isOpenFilter={isOpenFilter} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
