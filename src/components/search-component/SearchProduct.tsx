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
  generalCountryTarget,
  generalHolidayList,
  generalSeasonList,
} from "@/data/generalData";
import { SelectOption } from "@/types/common";
import { searchProduct } from "@/api/SearchApi";
import InputSearchComponent from "../general-component/InputSearchComponent";
import SearchForm, { getNewSearchForm, getSearchForm } from "@/model/SearchForm";
import { homeDropfirst, homeDropThird } from "@/data/home-data/homeListData";
import { useRouter, useSearchParams } from "next/navigation";
import GetApi from "@/api/GetApi";
import { title } from "process";
// import SearchResult from "./SearchResult";
type Filter = {
  key: any,
  title: any
}
type SearchKeys = 'type' | 'category' | 'service' | 'holiday' | 'season';
const SearchProduct = () => {
  const listCountry = generalCountryTarget;
  const listTypeGet = homeDropfirst;
  const [isLoading, setLoading] = useState(0);
  let firstLoadingFilter: Filter[] = [{ key: "service", title: "Free" }];
  let firstLoadingKeySearch: string = "";
  const { Panel } = Collapse;
  const [isOpenFilter, setIsOpenFilter] = useState(true);


  const [listData, setListData] = useState<any[]>([]);
  const dropFirst = homeDropfirst;
  const router = useRouter();
  const searchParams = useSearchParams();


  const transParams = (searchParams: any): SearchForm => {
    const filterTemp: Filter[] = []
    const type = searchParams.get("type");
    const categories: string[] = searchParams.get("category")?.split("-")
    const holidays: string[] = searchParams.get("holiday")?.split("-")
    const seasons: string[] = searchParams.get("season")?.split("-")
    const search: string = searchParams.get("search");
    const country: string[] = searchParams.get("countryTarget")?.split("=")
    const tempCat: any[] = [];
    const tempHol: any[] = [];
    const tempSea: any[] = [];
    const tempCountry: string[] = [];
    const tempType: number = type ? parseFloat(type) : 0;
    if (categories) {
      categories.forEach((item: string) => {
        const temp = generalCategoriesSelect.find(cat => cat.value.toString() === item)
        if (temp) {
          tempCat.push(temp)
        }
      })
    }
    if (holidays) {
      holidays.forEach((item: string) => {
        const temp = generalHolidayList.find(hol => hol.value.toString() === item)
        if (temp) {
          tempHol.push(temp)
        }
      })
    }
    if (seasons) {
      seasons.forEach((item: string) => {
        const temp = generalSeasonList.find(sea => sea.value.toString() === item)
        if (temp) {
          tempSea.push(temp)
        }
      })
    }
    if (country) {
      country.forEach((item: string) => {
        const temp = listCountry.find(ctr => ctr === item)
        if (temp) {
          tempCountry.push(temp)
        }
      })
    }
    tempCat.forEach((item: any) => {
      filterTemp.push({ key: "category", title: item.title });
    })
    tempHol.forEach((item: any) => {
      filterTemp.push({ key: "holiday", title: item.title });
    })
    tempSea.forEach((item: any) => {
      filterTemp.push({ key: "season", title: item.title });
    })
    tempCountry.forEach((item: string) => {
      filterTemp.push({ key: "countryTarget", title: item });
    })
    filterTemp.push(firstLoadingFilter[0])
    firstLoadingFilter = filterTemp;
    firstLoadingKeySearch = search ? search : firstLoadingKeySearch;

    return getSearchForm(tempCat, tempHol, tempSea, tempType, tempCountry);

  }

  ///data
  const [dataSearch, setDataSearch] = useState<SearchForm>(transParams(searchParams));
  const [filters, setFilters] = useState<Filter[]>(firstLoadingFilter);
  const [keySearch, setKeySearch] = useState(firstLoadingKeySearch);
  const [change, setChange] = useState(0);
  const [typeImgOrVideo, setTypeImgOrVideo] = useState(0);
  transParams(searchParams);
  const handleAddFilter = (key: string, item: any) => {
    let filtersTemp = [...filters];
    if (['category', 'holiday', 'season'].includes(key)) {
      let temp = [...dataSearch[key as SearchKeys]];
      console.log(temp);
      if (dataSearch[key as SearchKeys].length > 0 && dataSearch[key as SearchKeys].find((dat: any) => dat.value === item.value)) {
        temp = temp.filter(dat => dat.value != item.value);
        filtersTemp = filtersTemp.filter(filter => filter.title != item.title)
      }
      else {
        temp.push(item);
        filtersTemp.push({ key: key, title: item.title });
      }
      setDataSearch({ ...dataSearch, [key]: temp });
    }
    if (key === "Free") {
      if (item === true) {
        filtersTemp.push({ key: "service", title: "Free" })
      }
      else {
        filtersTemp = filtersTemp.filter(filter => filter.title != "Free")
      }
      setDataSearch({ ...dataSearch, service: { ...dataSearch.service, Free: item } });
    }
    if (key === "Premium") {

      if (item === true) {
        filtersTemp.push({ key: "service", title: "Premium" })
      }
      else {
        filtersTemp = filtersTemp.filter(filter => filter.title != "Premium")
      }
      setDataSearch({ ...dataSearch, service: { ...dataSearch.service, Premium: item } });
    }
    if (key === "type") {
      filtersTemp = filtersTemp.filter(item => item.key != "type");
      filtersTemp.push({ key: "type", title: item.title })
      setDataSearch({ ...dataSearch, type: item })
    }
    if (key === "countryTarget") {
      let temp = [...dataSearch.countryTarget]
      if (temp.find(tmp => tmp === item)) {
        temp = temp.filter(tmp => tmp != item);
        filtersTemp = filtersTemp.filter(filter => filter.title != item);
      } else {
        filtersTemp.push({ key: "countryTarget", title: item });
        temp.push(item);

      }
      setDataSearch({ ...dataSearch, countryTarget: temp });
    }
    setFilters(filtersTemp);
    checkAndRedirect();
  }


  const handleClose = (removedFilter: Filter) => {
    setFilters(filters.filter(filter => filter != removedFilter))
    if (['category', 'holiday', 'season'].includes(removedFilter.key)) {
      let temp = [...dataSearch[removedFilter.key as SearchKeys]];
      temp = temp.filter(fil => fil.title != removedFilter.title);
      setDataSearch({ ...dataSearch, [removedFilter.key]: temp })
    }
    if (removedFilter.key === "type") {
      setDataSearch({ ...dataSearch, type: dropFirst[0] });
    }
    if (removedFilter.key == "service") {

      setDataSearch({ ...dataSearch, service: { ...dataSearch.service, [removedFilter.title]: false } });
      checkAndRedirect();
    }
    if (removedFilter.key === "countryTarget") {
      let temp = [...dataSearch.countryTarget];
      temp = temp.filter(fill => fill != removedFilter.title);
      setDataSearch({ ...dataSearch, countryTarget: temp });
    }

  };
  const hanldeClearAll = () => {
    setFilters([]);
    setDataSearch(getNewSearchForm());
  };

  const checkAndRedirect = () => {

    // router.push('/search?page=1&size=10')
  }

  const handleClickSearch = () => {
    setChange(prev => prev + 1);
  }
  useEffect(() => {
    //category
    let category = "";
    dataSearch.category.forEach(cat => {
      category += "&category=" + cat.value
    })
    let holiday = "";
    dataSearch.holiday.forEach(hol => {
      holiday += "&holiday=" + hol.value
    })
    let season = "";
    dataSearch.season.forEach(sea => {
      season += "&season=" + sea.value
    })
    const countryTarget = dataSearch.countryTarget ? "&countryTarget=" + dataSearch.countryTarget : "";
    const type = dataSearch.type.value ? dataSearch.type.value : 0;
    let typeGet = "";

    switch (type) {
      case 0:
        typeGet = "getProducts"
        setTypeImgOrVideo(0);
        break;
      case 1:
        typeGet = "getImages"
        setTypeImgOrVideo(0);
        break;
      case 2:
        typeGet = "getVideos"
        setTypeImgOrVideo(1);
        break;

      default:
        typeGet = "getProducts"
        setTypeImgOrVideo(0);
        break;
    }
    const fetchData = async () => {
      setLoading(1);
      const params = category + holiday + season + countryTarget;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product/${typeGet}?page=1&size=1000&sort=desc&search=${keySearch}${params}`;
      const response = await GetApi(url);
      console.log(response, url)
      if (response.data && Array.isArray(response.data)) {
        setListData(response.data);

      }
      setLoading(0);
    }
    fetchData();

  }, [dataSearch, change])

  return (
    <div className="realative flex flex-col gap-2">
      <div className="h-14 main-menu"></div>
      <div className="px-8 py-2 sticky top-2 z-20 bg-white">
        <InputSearchComponent setDataSearch={setDataSearch} dataSearch={dataSearch} handleClickSearch={handleClickSearch} keySearch={keySearch} setKeySearch={setKeySearch} type={1} />
      </div>



      <div className="w-full mt-3 px-5">
        <div className={`${isOpenFilter ? "flex" : ""}`}>
          {isOpenFilter ? (
            ""
          ) : (
            <Button
              className="h-10 font-semibold bg-white hover:bg-gray-200 flex items-center"
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

                {filters.length > 0 ? (
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
                        {filters.map((item: Filter, index: number) => (
                          <Tag
                            key={index}
                            closable
                            color="#3F83F8"
                            onClose={() => handleClose(item)}
                            className="text-white w-fit py-1 flex px-2 justify-center items-center"
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
                    defaultActiveKey={["4"]}
                    ghost
                    expandIconPosition="end"
                  >
                    <Panel
                      header={
                        <span className="text-sm font-semibold">License</span>
                      }
                      key="4"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        <Button
                          color="default"
                          className={`${dataSearch.service.Free
                            ? "bg-blue-500 text-white "
                            : "bg-white text-black"
                            }`}
                          onClick={() => handleAddFilter("Free", !dataSearch.service.Free)}
                        >
                          Free
                        </Button>
                        <Button
                          color="default"
                          className={`${dataSearch.service.Premium
                            ? "bg-blue-500 text-white "
                            : "bg-white text-black"
                            }`}
                          onClick={() => handleAddFilter("Premium", !dataSearch.service.Premium)}
                        >
                          Premium
                        </Button>
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <span className="text-sm font-semibold">Type</span>
                      }
                      key="999"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {listTypeGet.map((item: any) => (
                          <Button
                            className={` ${dataSearch.type === item
                              ? "bg-blue-500 text-white hover:bg-blue-500"
                              : "bg-white text-black"
                              }`}
                            key={item.value}
                            onClick={() => handleAddFilter("type", item)}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>

                    <Panel
                      header={
                        <span className="text-sm font-semibold">Category</span>
                      }
                      key="1"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {generalCategoriesSelect.map((item: any) => (
                          <Button
                            color="default"
                            className={`${dataSearch.category?.includes(item)
                              ? "bg-blue-500 text-white hover:bg-blue-500"
                              : "bg-white text-black"
                              }`}
                            key={item.value}
                            onClick={() => handleAddFilter("category", item)}
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
                            className={`${dataSearch.season?.includes(item)
                              ? "bg-blue-500 text-white hover:bg-blue-500 "
                              : "bg-white text-black"
                              }`}
                            key={item.value}
                            onClick={() => handleAddFilter("season", item)}
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
                            className={`${dataSearch.holiday?.includes(item)
                              ? "bg-blue-500 text-white hover:bg-blue-500"
                              : "bg-white text-black"
                              }`}
                            key={item.value}
                            onClick={() => handleAddFilter("holiday", item)}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </div>
                    </Panel>



                    <Panel
                      header={
                        <span className="text-sm font-semibold">Country Target</span>
                      }
                      key="5"
                    >
                      <div className="w-12/12 flex flex-wrap gap-2">
                        {listCountry.map((item: string) => (
                          <Button
                            color="default"
                            className={`${dataSearch.countryTarget?.includes(item)
                              ? "bg-blue-500 text-white hover:bg-blue-500"
                              : "bg-white text-black"
                              }`}
                            key={item}
                            onClick={() => handleAddFilter("countryTarget", item)}
                          >
                            {item}
                          </Button>
                        ))}
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
            <SearchResult type={typeImgOrVideo} listData={listData} isOpenFilter={isOpenFilter} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
