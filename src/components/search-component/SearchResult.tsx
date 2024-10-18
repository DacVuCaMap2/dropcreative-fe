import { DataSearch } from "@/types/common";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { Col, Modal, Row } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ModalDetails from "./ModalDetails";

const SearchResult = (props: DataSearch) => {
  const { dataSearch, isOpenFilter } = props;
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState();

  return (
    <>
      <div
        className={`${
          isOpenFilter ? "w-11/12" : "w-full"
        } m-0 m-auto flex flex-col gap-4 pb-10`}
      >
        <p className="text-2xl text-gray-500">Popular</p>
        <div>
          <Row gutter={[16, 16]}>
            {dataSearch &&
              dataSearch?.map((item: any, index: number) => (
                <Col span={6} key={index}>
                  <Card className="col-span-12 sm:col-span-4 h-[300px] group hover:cursor-pointer">
                    <Image
                      width={200}
                      height={200}
                      alt="image 1"
                      className="z-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
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
