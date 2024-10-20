import { DataSearch } from "@/types/common";
import { Card } from "@nextui-org/react";
import { Col, Row, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ModalDetails from "./ModalDetails";
import { Download, Eye, Plus } from "lucide-react";
import Link from "next/link";

const SearchResult = (props: DataSearch) => {
  const { dataSearch, isOpenFilter } = props;
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState();

  return (
    <>
      <div
        className={`${
          isOpenFilter ? "w-11/12" : "w-full"
        } m-auto flex flex-col gap-4 pb-10`}
      >
        <p className="text-2xl text-gray-500">Popular</p>
        <div>
          <Row gutter={[16, 16]}>
            {dataSearch &&
              dataSearch?.map((item: any, index: number) => (
                <Col key={index} span={6} className="flex justify-center">
                  <Card className="relative col-span-12 sm:col-span-4 w-full h-[200px] hover:cursor-pointer rounded-md overflow-hidden">
                    <Image
                      width={200}
                      height={200}
                      alt="image 1"
                      className="z-0 w-full h-full object-cover"
                      src={
                        item.imageUrl
                          ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
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
                            <Link href={`/landing-page/product/${item.id}`}>
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
        </div>
      </div>
      <ModalDetails isDetails={isDetails} selectItem={selectItem} />
    </>
  );
};

export default SearchResult;
