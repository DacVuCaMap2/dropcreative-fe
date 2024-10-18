import { getProductDetail } from "@/api/SearchApi";
import {
  gender,
  generalCategoriesSelect,
  generalHolidayList,
  generalSeasonList,
} from "@/data/generalData";
import { Button, message, Modal, Tag } from "antd";
import { Download, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type IProps = {
  isDetails: boolean;
  selectItem: any;
};

const ModalDetails = (props: IProps) => {
  const { isDetails, selectItem } = props;
  const [listProductDetail, setListProductDetail] = useState<any>();
  const handleGetProductDetail = async () => {
    try {
      const res = await getProductDetail(selectItem.id);
      setListProductDetail(res.data);
    } catch (error: any) {
      message.error("error", error?.data?.message);
    }
  };
  const handleConvertData = (
    data: { title: string; value: number }[],
    value: number[]
  ) => {
    const result = data
      .filter((item) => value.includes(item.value))
      .map((items) => items.title);
    return result;
  };

  useEffect(() => {
    if (selectItem?.id) {
      handleGetProductDetail();
    }
  }, [selectItem?.id]);
  return (
    <Modal open={isDetails} width={1500} footer={null}>
      <div className="h-[70vh] overflow-auto pt-6">
        <div className="flex gap-10">
          <div className="w-9/12 h-[64vh]">
            <Image
              src={
                selectItem?.imageUrl
                  ? `${process.env.NEXT_PUBLIC_API_URL}${selectItem?.imageUrl}`
                  : "/image/nophotos.png"
              }
              className="z-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              alt="background"
              width={200}
              height={500}
            />
          </div>
          <div className="w-3/12 flex flex-col gap-4">
            <Button
              className="w-full h-14 bg-green-600 text-white font-semibold hover:bg-green-600 text-base rounded-xl"
              icon={<Download />}
              iconPosition="start"
            >
              Download
            </Button>
            <Button
              className="w-full h-14 bg-yellow-400 text-white font-semibold hover:bg-green-600 text-base rounded-xl"
              icon={<ShoppingCart />}
              iconPosition="start"
            >
              Add product
            </Button>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">
                {listProductDetail?.product?.title}
              </p>
              <div className="space-x-2  my-4 flex flex-row items-center">
                <span className="text-2xl">
                  ${listProductDetail?.product?.price}
                </span>
                <span className="line-through text-neutral-400 text-lg">
                  ${listProductDetail?.product?.comparePrice}
                </span>
                <span className="bg-black text-white py-1 px-4 rounded text-xs">
                  {listProductDetail?.product?.costPerPrice}%
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">Description:</p>
                <div className="pl-8 text-sm font-semibold text-gray-400">
                  <ul className="list-disc flex flex-col gap-2">
                    <li>
                      Shipping Fee: ${listProductDetail?.product?.shippingFee}
                    </li>
                    <li>CR: {listProductDetail?.productDetail?.cr}%</li>
                    <li>AOV: {listProductDetail?.productDetail?.aov}</li>
                    <li>
                      Country: {listProductDetail?.productDetail?.countryTarget}
                    </li>
                    <li>
                      Gender:{" "}
                      {
                        gender.filter(
                          (item) =>
                            item.value ===
                            listProductDetail?.productDetail?.genderTarget
                        )[0]?.title
                      }
                    </li>
                    <li>
                      Suitable age: {listProductDetail?.productDetail?.startAge}{" "}
                      - {listProductDetail?.productDetail?.endAge}
                    </li>
                    {listProductDetail?.product?.categoryIds ? (
                      <>
                        <li>
                          <div className="flex gap-1">
                            <p>Category:</p>
                            {handleConvertData(
                              generalCategoriesSelect,
                              listProductDetail?.product?.categoryIds
                            ).map((item, index) => (
                              <div key={index}>
                                <Tag className="text-gray-400">{item}</Tag>
                              </div>
                            ))}
                          </div>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    {listProductDetail?.productDetail?.holidayIds?.length ? (
                      <>
                        <li>
                          <div className="flex gap-1">
                            <p>Holiday:</p>
                            {handleConvertData(
                              generalHolidayList,
                              listProductDetail?.product?.categoryIds
                            ).map((item, index) => (
                              <div key={index}>
                                <Tag className="text-gray-400">{item}</Tag>
                              </div>
                            ))}
                          </div>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    {listProductDetail?.productDetail?.seasonIds?.length ? (
                      <>
                        <li>
                          <div className="flex gap-1">
                            <p>Season:</p>
                            {handleConvertData(
                              generalSeasonList,
                              listProductDetail?.product?.categoryIds
                            ).map((item, index) => (
                              <div key={index}>
                                <Tag className="text-gray-400">{item}</Tag>
                              </div>
                            ))}
                          </div>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetails;
