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
// import SearchResult from "./SearchResult";

const SearchProduct = () => {
  const { Panel } = Collapse;
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectOption[] | undefined
  >();
  const [selectedSeason, setSelectedSeason] = useState<
    SelectOption[] | undefined
  >();
  const [selectedHoliday, setSelectedHoliday] = useState<
    SelectOption[] | undefined
  >();
  const [valueInput, setValueInput] = useState<string>();
  const [dataSearch, setDataSearch] = useState<any>();
  const [scrollLocation, setScrollLocation] = useState(-210);
  const [filters, setFilters] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hiddenBtn, setHiddenBtn] = useState({ left: false, right: true });
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      setScrollLocation(scrollAmount);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      const hidLeft = scrollAmount === -500;
      const hidRight = scrollAmount === 500;
      setHiddenBtn({ left: hidLeft, right: hidRight });
    }
  };
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        let hidLeft = scrollWidth <= clientWidth;
        hidLeft = scrollLocation === -500 ? true : hidLeft;

        setHiddenBtn({
          left: hidLeft,
          right: scrollWidth <= clientWidth,
        });
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);
  const handleClick = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  const handleToggleItemInArray = <T,>(array: T[] = [], item: T): T[] => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    } else {
      return [...array, item];
    }
  };
  const handleProductSearch = async (search: string = "") => {
    try {
      const res = await searchProduct({
        search,
        page: 1,
        accountId: 1,
        size: 4,
        holiday: selectedHoliday?.map((item) => item.value),
        season: selectedSeason?.map((item) => item.value),
        category: selectedCategories?.map((item) => item.value),
      });
      setDataSearch(res.data.data);
    } catch (error: any) {
      message.error("Error:", error?.data?.message);
    }
  };
  const handleSearch = () => {
    handleProductSearch(valueInput ?? "");
  };
  const handleGetDataFilter = () => {
    const result = (selectedCategories ?? []).concat(
      selectedHoliday ?? [],
      selectedSeason ?? []
    );
    setFilters(result);
  };
  const handleClose = (removedFilter: any) => {
    console.log(filters);
    setFilters((prevFilters: any[] | undefined) => {
      if (!prevFilters) return [];
      return prevFilters.filter(
        (filter) => filter.value !== removedFilter.value
      );
    });
  };
  const hanldeClearAll = () => {
    setFilters([]);
  };
  useEffect(() => {
    handleProductSearch();
    handleGetDataFilter();
  }, [selectedCategories, selectedHoliday, selectedSeason]);
  return (
    <div className="flex flex-col gap-2">
      <div className="h-14 main-menu"></div>
      <div className="w-full h-16 flex flex-col justify-center items-center space-y-2 mb-1">
        <div className="w-full flex justify-center items-center relative p-5">
          <SearchDropDown />
          <Input
            placeholder="Search all assets"
            type="text"
            className="w-11/12 py-2 border-none h-full bg-gray-200 hover:border-0 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:border-0"
            onChange={(event) => {
              setValueInput(event.target.value);
            }}
          />
          <button
            className="absolute right-10 flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSearch}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </div>
      <hr />
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
                            className={`${
                              filters?.includes(item)
                                ? "bg-blue-500 text-white "
                                : "bg-gray-200 text-black"
                            }`}
                            key={item.value}
                            onClick={() => {
                              setSelectedCategories((prevSelected = []) =>
                                handleToggleItemInArray(prevSelected, item)
                              );
                              handleGetDataFilter();
                            }}
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
                            className={`${
                              selectedSeason?.includes(item)
                                ? "bg-blue-500 text-white "
                                : "bg-gray-200 text-black"
                            }`}
                            key={item.value}
                            onClick={() => {
                              setSelectedSeason((prevSelected = []) =>
                                handleToggleItemInArray(prevSelected, item)
                              );
                            }}
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
                            className={`${
                              selectedHoliday?.includes(item)
                                ? "bg-blue-500 text-white "
                                : "bg-gray-200 text-black"
                            }`}
                            key={item.value}
                            onClick={() => {
                              setSelectedHoliday((prevSelected = []) =>
                                handleToggleItemInArray(prevSelected, item)
                              );
                            }}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">
                          Base model
                        </span>
                      }
                      key="4"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        <Button color="default" variant="outlined">
                          Midjourney
                        </Button>
                        <Button color="default" variant="outlined">
                          Stable Diffusion
                        </Button>
                        <Button color="default" variant="outlined">
                          Dall-e
                        </Button>
                        <Button color="default" variant="outlined">
                          Freepik
                        </Button>
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">Color</span>
                      }
                      key="5"
                    >
                      <div className="flex w-full flex-wrap gap-2">
                        {[
                          "#FFFFFF",
                          "#FB5252",
                          "#FCA120",
                          "#FCDB7E",
                          "#4AD395",
                          "#1273EB",
                          "#8080F1",
                          "#1D262D",
                          "#BAC8D3",
                        ].map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border cursor-pointer flex items-center justify-center"
                            style={{ backgroundColor: color }}
                            onClick={() => handleClick(color)}
                          >
                            {selectedColor === color && (
                              <Check className="text-white w-4 h-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">
                          Include prompt
                        </span>
                      }
                      key="6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          Only show images that include a prompt
                        </span>
                        <Switch />
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">People</span>
                      }
                      key="7"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        <Button color="default" variant="outlined">
                          With people
                        </Button>
                        <Button color="default" variant="outlined">
                          No people
                        </Button>
                      </div>
                      <Collapse
                        defaultActiveKey={["1"]}
                        ghost
                        expandIconPosition="end"
                      >
                        <Panel
                          header={
                            <span className="text-sm font-semibold text-gray-400">
                              Number of people
                            </span>
                          }
                          key="1"
                        >
                          <div className="w-12/12 flex flex-wrap gap-2">
                            {["1", "2", "3", "4+"].map((type) => (
                              <Button
                                color="default"
                                variant="outlined"
                                key={type}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          header={
                            <span className="text-sm font-semibold text-gray-400">
                              Age
                            </span>
                          }
                          key="2"
                        >
                          <div className="w-12/12 flex flex-wrap gap-2">
                            {[
                              "Infant",
                              "Child",
                              "Teen",
                              "Young adult",
                              "Adult",
                              "Senior",
                              "Elder",
                            ].map((type) => (
                              <Button
                                color="default"
                                variant="outlined"
                                key={type}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          header={
                            <span className="text-sm font-semibold text-gray-400">
                              Gender
                            </span>
                          }
                          key="3"
                        >
                          <div className="w-12/12 flex flex-wrap gap-2">
                            {["Male", "Female"].map((type) => (
                              <Button
                                color="default"
                                variant="outlined"
                                key={type}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          header={
                            <span className="text-sm font-semibold text-gray-400">
                              Ethnicity
                            </span>
                          }
                          key="4"
                        >
                          <div className="w-12/12 flex flex-wrap gap-2">
                            {[
                              "WaterColor",
                              "Child",
                              "Teen",
                              "Young adult",
                              "Adult",
                              "Senior",
                              "Elder",
                            ].map((type) => (
                              <Button
                                color="default"
                                variant="outlined"
                                key={type}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </Panel>

                        <Panel header="Include prompt" key="5">
                          <div className="flex items-center justify-between">
                            <span>Only show images that include a prompt</span>
                            <Switch />
                          </div>
                        </Panel>
                      </Collapse>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">File type</span>
                      }
                      key="8"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {["JPG", "AI", "EPS", "SVG", "PNG"].map((type) => (
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">Style</span>
                      }
                      key="9"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {[
                          "Watercolor",
                          "Flat",
                          "Cartoon",
                          "Geometric",
                          "Gradient",
                          "Isometric",
                          "3D",
                          "Hand Drawn",
                        ].map((type) => (
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">
                          Orientation
                        </span>
                      }
                      key="8"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {["Horizontal", "Vertical", "Square", "Panoramic"].map(
                          (type) => (
                            <Button
                              color="default"
                              variant="outlined"
                              key={type}
                            >
                              {type}
                            </Button>
                          )
                        )}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">
                          DropCreative&#39;s Choice
                        </span>
                      }
                      key="9"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          See our favourites
                        </span>
                        <Switch />
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
            <SearchResult dataSearch={dataSearch} isOpenFilter={isOpenFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
