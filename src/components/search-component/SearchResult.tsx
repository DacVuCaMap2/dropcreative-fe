import { DataSearch } from "@/types/common";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

const SearchResult = (props: DataSearch) => {
  const { dataSearch, isOpenFilter } = props;

  return (
    <div
      className={`${
        isOpenFilter ? "w-11/12" : "w-full"
      } m-0 m-auto flex flex-col gap-4`}
    >
      <p className="text-2xl text-gray-500">Popular</p>
      <div>
        <Row gutter={[16, 16]}>
          {dataSearch &&
            dataSearch?.map((item: any) => (
              <Col span={6}>
                {/* <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <>
                      <Image
                        width={200}
                        height={200}
                        src={
                          item.imageUrl
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
                            : "/image/nophotos.png"
                        }
                        alt="image 1"
                      />
                    </>
                  }
                /> */}
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
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
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default SearchResult;
