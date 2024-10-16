"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import {
  ArrowLeftFromLine,
  Check,
  ChevronLeft,
  ChevronRight,
  FileTerminal,
  Image,
  Scan,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button, Collapse, Input, Switch } from "antd";
import SearchResult from "./SearchResult";

const SearchProduct = () => {
  const { Panel } = Collapse;
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [scrollLocation, setScrollLocation] = useState(-210);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hiddenBtn, setHiddenBtn] = useState({ left: false, right: true });
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500; // Điều chỉnh giá trị này nếu cần
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
            <div>
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header={
                    <span className="text-sm font-semibold">Asset type</span>
                  }
                  key="1"
                >
                  <div className="w-12/12 flex flex-wrap gap-2">
                    {[
                      "Vectors",
                      "Photos",
                      "Videos",
                      "PSD",
                      "Templates",
                      "Mockups",
                    ].map((type) => (
                      <Button color="default" variant="outlined" key={type}>
                        {type}
                      </Button>
                    ))}
                  </div>
                </Panel>

                {/* License */}
                <Panel
                  header={
                    <span className="text-sm font-semibold">License</span>
                  }
                  key="2"
                >
                  <div className="w-12/12 flex flex-wrap gap-2">
                    <Button color="default" variant="outlined">
                      Free
                    </Button>
                    <Button color="default" variant="outlined">
                      Premium
                    </Button>
                  </div>
                </Panel>

                {/* AI-generated */}
                <Panel
                  header={
                    <span className="text-sm font-semibold">AI-generated</span>
                  }
                  key="3"
                >
                  <div className="w-12/12 flex flex-wrap gap-2">
                    <Button color="default" variant="outlined">
                      Exclude AI-generated
                    </Button>
                    <Button color="default" variant="outlined">
                      Only AI-generated
                    </Button>
                  </div>
                </Panel>
                {/* Base model */}
                <Panel
                  header={
                    <span className="text-sm font-semibold">Base model</span>
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

                {/* Color */}
                <Panel
                  header={<span className="text-sm font-semibold">Color</span>}
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

                {/* Include Prompt */}
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
                {/* People */}
                <Panel
                  header={<span className="text-sm font-semibold">People</span>}
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
                    {/* Number of people */}
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
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    {/* Age */}
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
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    {/* Gender */}
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
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    {/* Ethnicity */}
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
                          <Button color="default" variant="outlined" key={type}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    {/* Include Prompt */}
                    <Panel header="Include prompt" key="5">
                      <div className="flex items-center justify-between">
                        <span>Only show images that include a prompt</span>
                        <Switch />
                      </div>
                    </Panel>
                  </Collapse>
                </Panel>
                {/* File type */}
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
                {/* Style */}
                <Panel
                  header={<span className="text-sm font-semibold">Style</span>}
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
                {/* Orientation */}
                <Panel
                  header={
                    <span className="text-sm font-semibold">Orientation</span>
                  }
                  key="8"
                >
                  <div className="w-12/12 flex flex-wrap gap-2">
                    {["Horizontal", "Vertical", "Square", "Panoramic"].map(
                      (type) => (
                        <Button color="default" variant="outlined" key={type}>
                          {type}
                        </Button>
                      )
                    )}
                  </div>
                </Panel>
                {/* DropCreative's Choice */}
                <Panel
                  header={
                    <span className="text-sm font-semibold">
                      DropCreative's Choice
                    </span>
                  }
                  key="9"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">See our favourites</span>
                    <Switch />
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={`${isOpenFilter ? "w-5/6" : ""}`}>
          <div
            className={`relative flex ${
              isOpenFilter ? "justify-center items-start w-full" : "justify-end"
            } `}
          >
            {isOpenFilter ? (
              ""
            ) : (
              <div className="h-full w-2/12 pt-4 flex justify-center">
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
              </div>
            )}
            <ChevronLeft
              width={40}
              height={40}
              onClick={() => scroll("left")}
              className={`absolute p-2 cursor-pointer ${
                hiddenBtn.left && "opacity-0 pointer-events-none"
              } ${isOpenFilter ? "left-5 z-20 top-4" : "left-60 z-20 top-4"}`}
            />
            <div
              ref={scrollRef}
              className={`${isOpenFilter} ?  w-11/12 flex gap-5 overflow-hidden mt-4 items-end`}
            >
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
            <ChevronRight
              width={40}
              height={40}
              onClick={() => scroll("right")}
              className={`absolute z-20 p-2 cursor-pointer ${
                hiddenBtn.right && "opacity-0 pointer-events-none"
              } ${isOpenFilter ? "right-5 top-4" : "-right-10 top-4"}`}
            />
          </div>
          <div className="w-11/12 m-0 m-auto mt-2">
            <SearchResult />
          </div>
        </div>
      </div>
      <hr className="mt-2" />
      {isOpenFilter ? (
        ""
      ) : (
        <div className="w-11/12 m-0 m-auto pl-3 mt-2">
          <SearchResult />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
