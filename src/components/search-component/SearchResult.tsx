import { DataSearch } from "@/types/common";
import { Card } from "@nextui-org/react";
import { Col, Row, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ModalDetails from "./ModalDetails";
import { Download, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";

type Props = {
  listData: any[],
  isOpenFilter: boolean,
  isLoading: number,
  type: number

}
const SearchResult = (props: Props) => {
  const { listData, isOpenFilter, isLoading } = props;
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState();

  return (
    <>
      <div
        className={`${isOpenFilter ? "w-11/12" : "w-full"
          } m-auto flex flex-col gap-4 pb-10`}
      >
        <p className="text-2xl text-gray-500">Popular</p>
        <div>
          {isLoading === 0 ?
            <div>
              {props.type === 0 ?
                <Row gutter={[30, 30]}>
                  {listData &&
                    listData?.map((item: any, index: number) => (
                      <Col key={index} span={6} className="flex justify-center">
                        <Card className={`${isOpenFilter ? "h-[300px]" : "h-[400px]"} relative col-span-12 sm:col-span-4 w-full rounded-sm hover:cursor-pointer overflow-hidden shadow-none`}>
                          <Image
                            width={200}
                            height={200}
                            alt="image 1"
                            className="z-0 w-full h-full object-cover"
                            src={
                              item.url
                                ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}`
                                : "/image/nophotos.png"
                            }
                            onClick={() => {
                              setIsDetails(true);
                              setSelectItem(item);
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-start justify-end">
                            <div className="p-3 flex flex-col gap-2">
                              <Tooltip title="Download" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Download width={15} height={15} />
                                </div>
                              </Tooltip>
                              <Tooltip title="Add Product" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Plus width={15} height={15} />
                                </div>
                              </Tooltip>
                              <Tooltip title="View Product" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Link target="_blank" href={`/landing-page/product/${item.id}`}>
                                    <Eye width={15} height={15} />
                                  </Link>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                </Row>

                :
                <Row gutter={[30, 30]}>
                  {listData &&
                    listData.map((item: any, index: number) => (
                      <Col key={index} span={6} className="flex justify-center">
                        <Card className={`${isOpenFilter ? "h-[300px]" : "h-[400px]"} relative col-span-12 sm:col-span-4 w-full rounded-sm hover:cursor-pointer overflow-hidden shadow-none`}>
                          <video
                            width={200}
                            height={200}
                            className="z-0 w-full h-full object-cover"
                            controls // Thêm thuộc tính controls nếu bạn muốn người dùng có thể điều khiển video
                            onClick={() => {
                              setIsDetails(true);
                              setSelectItem(item);
                            }}
                          >
                            <source src={item.url ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}` : "/video/novideo.mp4"} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          {/* <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-start justify-end">
                            <div className="p-3 flex flex-col gap-2">
                              <Tooltip title="Download" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Download width={15} height={15} />
                                </div>
                              </Tooltip>
                              <Tooltip title="Add Product" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Plus width={15} height={15} />
                                </div>
                              </Tooltip>
                              <Tooltip title="View Product" placement="leftTop">
                                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
                                  <Link href={`/landing-page/product/${item.id}`}>
                                    <Eye width={15} height={15} />
                                  </Link>
                                </div>
                              </Tooltip>
                            </div>
                          </div> */}
                        </Card>
                      </Col>
                    ))}
                </Row>

              }
            </div>
            :
            <div className="min-h-64 flex justify-center items-center">
              <ScaleLoader color="gray" />
            </div>
          }
        </div>
      </div>
      <ModalDetails isDetails={isDetails} selectItem={selectItem} />
    </>
  );
};

export default SearchResult;
