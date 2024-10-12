"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AddProductComponent.css";
import { CircleAlert, Crown, FileImage, Save, Trash, Type, X } from "lucide-react";
import { Tooltip } from "react-tooltip";
import TinyMCEEditor from "@/components/TinyMCE/TinyMCEEditor";
import Product, { getNewProduct } from "@/model/Product";
import Image from "next/image";
import PhotoGallery from "@/components/imgdrag/ImageDrag";
import Modal from 'react-modal';
import { div, form } from "framer-motion/client";
import axios from "axios";
type productVariant = {
  optionName: string;
  optionValue: string[];
  optionInput: string;
};
type variantDetails = {
  name: string;
  price: number;
  comparePrice: number;
  quantity: number;
  image: File | null;
  sku: string;
  barcode: string;
  fileName: string;
  value: string;
  status: number;
};

export default function AddProductComponent() {
  const accountId = 1;
  const [productData, setProductData] = useState<Product>(getNewProduct());
  const [listVariant, setListVariant] = useState<productVariant[]>([]);
  const [description, setDescription] = useState(`<p>${productData.description}</p>`);
  const [contentCalling, setContentCalling] = useState(`<p>${productData.contentCalling}</p>`);
  const [videos, setVideos] = useState<File[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isOpenSelectPhoto, setIsOpenSelectPhoto] = useState(false);
  const [indCurrent, setIndCurrent] = useState(0);
  const [serviceT, setServiceT] = useState({
    free: productData.serviceType === 1 || productData.serviceType === 3 ? true : false
    , premium: productData.serviceType === 2 || productData.serviceType === 3 ? true : false
  });

  const [listVariantDetails, setListVariantDetails] = useState<variantDetails[]>([]);
  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsOpenSelectPhoto(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setIsOpenSelectPhoto(false);
  };


  const handleEditorChange = (newContent: any) => {
    setDescription(newContent);
  };
  const handleContentCalling = (newContent: any) => {
    setContentCalling(contentCalling);
  };
  const handleServiceType = (e: any, key: string) => {
    const value = e.target.checked;
    console.log(value);
    setServiceT({ ...serviceT, [key]: value })
  }
  const handleChange = (e: any, key: string) => {
    let value = e.target.value;
    if (key === "isPersonal") {
      value = e.target.checked;
    }
    console.log(value);
    /// cac gia tri price
    if (
      key === "price" ||
      key === "comparePrice" ||
      key === "costPerPrice" ||
      key === "shippingFee"
    ) {
      value = value ? parseFloat(value) : 0;
    }
    const productTemp = { ...productData, [key]: value };
    console.log(productTemp);
    setProductData(productTemp);
  };

  const handleAddVariant = () => {
    if (listVariant.length < 3) {
      const newVariant: productVariant = {
        optionName: "",
        optionValue: [],
        optionInput: "",
      };
      setListVariant([...listVariant, newVariant]);
    }
  };
  const handleDeleteVariant = (ind: number) => {
    const newList = listVariant.filter(
      (item: productVariant, childIndex) => childIndex != ind
    );
    setListVariant(newList);
    if (newList.length === 0) {
      setListVariantDetails([]);
    }
  };
  const handleChangeVariantName = (ind: number, e: any) => {
    const value = e.target.value;
    const tempListVariant = [...listVariant];
    const newListVariant = tempListVariant.map(
      (item: productVariant, index) => {
        if (index === ind) {
          return { ...item, optionName: value };
        }
        return item;
      }
    );
    setListVariant(newListVariant);
  };

  const handleChangeVariantValue = (ind: number, e: any) => {
    const value = e.target.value;
    const tempListVariant = [...listVariant];
    const newListVariant = tempListVariant.map(
      (item: productVariant, index) => {
        if (index === ind) {
          return { ...item, optionInput: value };
        }
        return item;
      }
    );
    setListVariant(newListVariant);
  };

  const handleKeyDownVariant = (e: any, ind: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tempListVariant = [...listVariant];
      const newListVariant = tempListVariant.map(
        (item: productVariant, index) => {
          if (index === ind && item.optionInput) {
            const tempOptionValue = item.optionValue;
            tempOptionValue.push(item.optionInput);
            return { ...item, optionInput: "", optionValue: tempOptionValue };
          }
          return item;
        }
      );
      setListVariant(newListVariant);
    }
  };

  const handleDelChildVariant = (childInd: number, ind: number) => {
    const tempListVariant = [...listVariant];
    const newListVariant = tempListVariant.map(
      (item: productVariant, index) => {
        if (index === ind) {
          const tempOptionValue = item.optionValue.filter(
            (str: string, childIndex) => childIndex != childInd
          );
          return { ...item, optionValue: tempOptionValue };
        }
        return item;
      }
    );
    setListVariant(newListVariant);
  };

  const handleChangeVariantDetails = (ind: number, e: any, key: string) => {
    const value = e.target.value;
    const newDetails = [...listVariantDetails].map(
      (item: variantDetails, index) => {
        if (index === ind) {
          return { ...item, [key]: value };
        }
        return item;
      }
    );
    setListVariantDetails(newDetails);
  };
  useEffect(() => {
    if (listVariant.length > 0 && listVariant[0].optionValue.length > 0) {
      const combineOptionValues = (options: productVariant[]): string[] => {
        const filterOption = options.filter(
          (option) => option.optionValue.length > 0
        );
        const values: string[][] = filterOption.map(
          (option) => option.optionValue
        );

        const result: string[][] = [];

        const combine = (
          prefix: string[],
          remainingArrays: string[][]
        ): void => {
          if (remainingArrays.length === 0) {
            result.push(prefix);
            return;
          }

          const [firstArray, ...restArrays] = remainingArrays;

          firstArray.forEach((item) => {
            combine([...prefix, item], restArrays);
          });
        };

        combine([], values);
        return result.map((items) => items.join(","));
      };

      const result = combineOptionValues(listVariant);

      // Kiểm tra độ dài trước khi tạo tempVariantDetails
      const limitedResult = result.slice(0, 50); // Giới hạn độ dài mảng là 50
      const oldListVariantDetails = [...listVariantDetails];
      const tempVariantDetails = limitedResult.map((str: string) => {
        const oldDetail = oldListVariantDetails.find(
          (oldStr) => oldStr.name === str
        );
        if (oldDetail) {
          return oldDetail;
        }
        return {
          name: str,
          price: productData.price,
          comparePrice: productData.comparePrice,
          quantity: 1,
          image: photos.length > 0 ? photos[0] : null,
          sku: "",
          barcode: "",
          value: "",
          fileName: "",
          status: 1
        };
      });

      setListVariantDetails(tempVariantDetails);
    }
  }, [listVariant]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddVideoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    if (files) {
      const temp = [...videos];
      temp.push(files)
      if (temp.length === 3) {
        temp.splice(0, 1);
      }
      setVideos(temp);
    }
  };

  //images
  const fileImgtRef = useRef<HTMLInputElement | null>(null);
  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      const oldLenght = photos.length;
      let tempList = [...photos, ...newPhotos];
      if (tempList.length - 10 > 0) {
        tempList = tempList.slice(tempList.length - 10, tempList.length)
      }
      setPhotos(tempList);
    }
  };
  const handleAddMediaClick = () => {
    if (fileImgtRef.current) {
      fileImgtRef.current.click();
    }
  };



  const handleSelectVariantImg = (img: File) => {
    const variantInd = indCurrent;
    const temp = [...listVariantDetails].map((details: variantDetails, index) => {
      if (variantInd === index) {
        return { ...details, image: img };
      }
      return details;
    })
    setListVariantDetails(temp);
    closeModal();
  }


  const handleSubmit = async () => {
    console.log(productData);
    console.log(videos);
    console.log(photos);
    console.log(listVariantDetails);
    console.log(serviceT);
    const productVariants = listVariantDetails.map((item: variantDetails, index) => {
      return { value: item.name,status:item.status,price:item.price,comparePrice:item.comparePrice,quantity:item.quantity,
        sku:item.sku,barcode:item.barcode, fileName: item.image ? `${index}-${accountId}image${Date.now()}` : '' }
    })
    let serviceType = 4;
    serviceType = serviceT.free && serviceT.premium ? 3 : serviceType;
    serviceType = serviceT.free && !serviceT.premium ? 1 : serviceType;
    serviceType = !serviceT.free && serviceT.premium ? 2 : serviceType;
    let variantValue = listVariant.map(item => item.optionName).join('./');
    let postData = { ...productData, productVariants: productVariants, serviceType: serviceType, accountId: accountId,variant:variantValue };
    const {id,...filterPostData} = postData;
    const formData = new FormData();
    formData.append("data", JSON.stringify(filterPostData));

    if (photos.length > 0) {
      photos.forEach((photo, index) => {
        formData.append(`images`, photo); // Ghi chú: tên "images" phải khớp với tên ở server
      });
    }
    if (videos.length > 0) {
      videos.forEach((video, index) => {
        formData.append(`videos`, video); // Ghi chú: tên "videos" phải khớp với tên ở server
      });
    }
    console.log(photos,videos);
    console.log(filterPostData);
    let url = process.env.NEXT_PUBLIC_API_URL + "/api/product"
    try {

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Thiết lập Content-Type cho formData
        },
      });
      console.log('Success:', response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } 
  }
  return (
    <div className="relative  flex justify-between items-center w-full flex-wrap">
      <div className="w-1/2">
        <p>
          Build a landing page to display demos on search pages or sell products
          on the market
        </p>
      </div>
      <button onClick={handleSubmit} className="sticky top-4 right-2  flex  items-center bg-blue-500 hover:bg-blue-600 text-xs font-bold text-white px-4 py-2 rounded">
        <Save size={16} className="mr-2" />
        Save
      </button>
      <div className="flex flex-row w-full add-component py-4 space-x-2">
        <div className="flex flex-col w-2/3 px-2 space-y-6">
          <div className="border px-4 py-4 text-neutral-600 space-y-4 shadow-lg">
            <div className="space-y-2">
              <label className="block text-sm font-bold">Product name *</label>
              <input
                type="text"
                value={productData.title}
                onChange={(e) => handleChange(e, "title")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type title"
                required
              />
              <label className="block mb-2 text-xs">
                {productData.title.length}/225
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-bold">
                  Content calling for purchases *
                </label>
                <div className="circle-alert cursor-pointer">
                  <CircleAlert size={20} />
                  <Tooltip
                    anchorSelect=".circle-alert"
                    place="right"
                    className="text-xs"
                  >
                    Certain special text styles from other sources will be
                    automatically removed to maintain consistency with your
                    website style
                  </Tooltip>
                </div>
              </div>

              <div className="text-right">
                <TinyMCEEditor
                  initialValue={contentCalling}
                  onEditorChange={handleContentCalling}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-bold">Description *</label>
                <div className="circle-alert cursor-pointer">
                  <CircleAlert size={20} />
                  <Tooltip
                    anchorSelect=".circle-alert"
                    place="right"
                    className="text-xs"
                  >
                    Certain special text styles from other sources will be
                    automatically removed to maintain consistency with your
                    website style
                  </Tooltip>
                </div>
              </div>

              <div className="text-right">
                <TinyMCEEditor
                  initialValue={description}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </div>
          </div>

          <div className="border px-4 text-neutral-600 space-y-6 shadow-lg py-8">
            <div className="flex flex-row justify-between items-center ">
              <span className="font-bold">
                Videos ({videos.length}/2) (dang phat trien ...)
              </span>
              <div className="flex flex-col">
                <button className="text-blue-500 hover:underline" onClick={handleAddVideoClick}>
                  Add Video
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*" // Chỉ cho phép chọn video
                  style={{ display: 'none' }} // Ẩn input
                />
              </div>
            </div>
            {videos.length > 0 &&
              <div className="flex flex-row border-t pt-4 justify-center space-x-4">
                {videos.map((item: File, index) => (
                  <div key={index} className="mb-4 rounded-2xl overflow-auto shadow-xl relative">
                    <video
                      width="320"
                      height="240"
                      controls
                      src={URL.createObjectURL(item)} // Tạo URL tạm thời cho video
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute right-2 top-2">
                      <button onClick={() => setVideos(videos.filter((vid: File, ind) => ind != index))} className="p-2 bg-white">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>}
          </div>


          {/* <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-8">
            <div className="flex flex-row justify-between items-center">
              <span className="font-bold">
                Photos ({photos.length}/10) (dang phat trien ...)
              </span>
              <div className="flex flex-col">
                <button className="text-blue-500 hover:underline" onClick={handleAddMediaClick}>
                  Add photos
                </button>
                <input
                  type="file"
                  ref={fileImgtRef}
                  onChange={handleImgChange}
                  accept="image/*" // Chỉ cho phép chọn ảnh
                  multiple // Cho phép chọn nhiều ảnh
                  style={{ display: 'none' }} // Ẩn input
                />
              </div>
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-5 gap-4 border-t pt-4 ">
                {photos.map((item: File, index) => (
                  <div key={index} className="flex flex-col items-center rounded-lg border shadow-xl">
                    <img
                      src={URL.createObjectURL(item)} // Tạo URL tạm thời cho ảnh
                      alt={item.name}
                      className="w-36 h-36 object-cover" // Kích thước ảnh
                    />
                  </div>
                ))}
              </div>
            )}
          </div> */}



          <PhotoGallery photos={photos} setPhotos={setPhotos} />

          <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-4">
            <span className="font-bold">Pricing</span>

            <div className="flex flex-row flex-wrap">
              <div className="flex flex-col space-y-1 w-1/3 mr-6 mb-4">
                <span className="font-bold text-neutral-500 text-sm">
                  Price
                </span>
                <div className="flex">
                  <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                    USD
                  </div>
                  <div className="relative w-full">
                    <input
                      value={productData.price === 0 ? "" : productData.price}
                      onChange={(e) => handleChange(e, "price")}
                      type="number"
                      id="location-search"
                      className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-1/3 mr-6">
                <span className="font-bold text-neutral-500 text-sm">
                  Compare at price
                </span>
                <div className="flex">
                  <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                    USD
                  </div>
                  <div className="relative w-full">
                    <input
                      value={
                        productData.comparePrice === 0
                          ? ""
                          : productData.comparePrice
                      }
                      onChange={(e) => handleChange(e, "comparePrice")}
                      type="number"
                      id="location-search"
                      className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-1/3 mr-6">
                <span className="font-bold text-neutral-500 text-sm">
                  Cost per price
                </span>
                <div className="flex">
                  <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                    USD
                  </div>
                  <div className="relative w-full">
                    <input
                      value={
                        productData.costPerPrice === 0
                          ? ""
                          : productData.costPerPrice
                      }
                      onChange={(e) => handleChange(e, "costPerPrice")}
                      type="number"
                      id="location-search"
                      className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-1/3 mr-6">
                <span className="font-bold text-neutral-500 text-sm">
                  Shipping fee
                </span>
                <div className="flex">
                  <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                    USD
                  </div>
                  <div className="relative w-full">
                    <input
                      value={
                        productData.shippingFee === 0
                          ? ""
                          : productData.shippingFee
                      }
                      onChange={(e) => handleChange(e, "shippingFee")}
                      type="number"
                      id="location-search"
                      className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-4">
            <div>
              <p className="font-bold">Payment method (dang phat trien....)</p>
              <p>Choose a payment method for this product</p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold">
                Payment gateway{" "}
              </label>
              <select
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-3"
                required
                defaultValue={""}
              >
                <option value="MALE">Your paypal </option>
                <option value="FEMALE">... card shielđ</option>
              </select>
            </div>
          </div>

          <div className="border px-4 py-4 text-neutral-600 space-y-4 shadow-lg">
            <div className="border-b pb-4">
              <div className="flex flex-row justify-between items-center">
                <span className="font-bold">
                  Variant ({listVariantDetails.length}/50)
                </span>
                <div className="flex flex-col">
                  <button
                    onClick={(e) => handleAddVariant()}
                    className="text-blue-500 hover:underline"
                  >
                    Add Variant
                  </button>
                </div>
              </div>
              <span className="text-sm">
                Add variants if this product comes in multiple versions, like
                different sizes or colors.
              </span>
            </div>
            <div>
              {listVariant.map((item: productVariant, index) => (
                <div
                  key={index}
                  className="flex flex-row space-x-4 justify-center mb-4 border-b py-2"
                >
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-bold text-sm">
                      Option name
                    </label>
                    <input
                      type="text"
                      value={item.optionName}
                      onChange={(e) => handleChangeVariantName(index, e)}
                      className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      placeholder="Type name"
                      required
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <label htmlFor="" className="font-bold text-sm">
                      Option value{" "}
                      <span className="font-thin">
                        (press &#39;Enter&#39; to separate values. Example |
                        size :xs,s,xl,...)
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      value={item.optionInput}
                      onChange={(e) => handleChangeVariantValue(index, e)}
                      onKeyDown={(e) => handleKeyDownVariant(e, index)}
                      className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      placeholder="Separate options with comma "
                      required
                    />
                    <div className=" w-full flex flex-row flex-wrap py-1">
                      {item.optionValue.map((str: string, childIndex) => (
                        <div
                          key={childIndex}
                          className="bg-gray-200 mr-2 pl-2 flex flex-row space-x-4 items-center rounded mb-2"
                        >
                          <span>{str}</span>
                          <button
                            onClick={() =>
                              handleDelChildVariant(childIndex, index)
                            }
                            className="h-full hover:bg-gray-300 py-2 px-1"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteVariant(index)}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
            <div className="">
              {listVariantDetails.length > 0 && (
                <table className="table-auto min-w-full">
                  <thead className=" border-b">
                    <tr>
                      <th className="py-4">Variant</th>
                      <th className="py-4">Image</th>
                      <th className="py-4">Price</th>
                      <th className="py-4">Compare Price</th>
                      <th className="py-4">Quantity</th>
                      <th className="py-4">Sku</th>
                      <th className="py-4">Barcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listVariantDetails.map(
                      (variantItem: variantDetails, childInd) => (
                        <tr key={childInd} className="text-center">
                          <td className="px-2 py-2 text-sm truncate">
                            {variantItem.name}
                          </td>
                          <td className="px-2 py-2 w-36">
                            <div>
                              <button onClick={() => { openModal(); setIndCurrent(childInd) }}>
                                {variantItem.image ?
                                  <img
                                    src={URL.createObjectURL(variantItem.image)}
                                    alt={"image"}
                                    className="rounded cursor-pointer w-32 h-32 object-cover border shadow-lg"
                                  /> :
                                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                                    <FileImage size={40} />
                                  </div>
                                }
                              </button>

                              <Modal
                                isOpen={isOpenSelectPhoto}
                                onRequestClose={closeModal}
                                contentLabel="Select Image"
                                className="modal z-40 relative"
                              >
                                <button className="absolute top-2 right-2 bg-gray-200 p-2 rounded hover:bg-gray-400" onClick={closeModal}>
                                  <X />
                                </button>
                                <span className="border-b font-bold text-xl">Select an Image</span>
                                <div className="image-gallery p-2">
                                  {photos.length > 0 && (
                                    <div className="grid grid-cols-5 gap-4 pt-4 ">
                                      {photos.map((item: File, photoInd) => (
                                        <div onClick={() => handleSelectVariantImg(item)} key={photoInd} className="flex flex-col items-center rounded-lg border shadow-xl overflow-hidden">
                                          <img
                                            src={URL.createObjectURL(item)} // Tạo URL tạm thời cho ảnh
                                            alt={item.name}
                                            className="w-36 h-36 object-cover" // Kích thước ảnh
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Modal>
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <input
                              onChange={(e) =>
                                handleChangeVariantDetails(childInd, e, "price")
                              }
                              value={variantItem.price}
                              type="number"
                              className="w-full rounded bg-gray-100 outline-none border-gray-200"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              onChange={(e) =>
                                handleChangeVariantDetails(
                                  childInd,
                                  e,
                                  "comparePrice"
                                )
                              }
                              value={variantItem.comparePrice}
                              type="number"
                              className="w-full rounded bg-gray-100 outline-none border-gray-200"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              onChange={(e) =>
                                handleChangeVariantDetails(
                                  childInd,
                                  e,
                                  "quantity"
                                )
                              }
                              value={variantItem.quantity}
                              type="number"
                              className="w-full rounded bg-gray-100 outline-none border-gray-200"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              onChange={(e) =>
                                handleChangeVariantDetails(childInd, e, "sku")
                              }
                              value={variantItem.sku}
                              type="text"
                              className="w-full rounded bg-gray-100 outline-none border-gray-200"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              onChange={(e) =>
                                handleChangeVariantDetails(
                                  childInd,
                                  e,
                                  "barcode"
                                )
                              }
                              value={variantItem.barcode}
                              type="text"
                              className="w-full rounded bg-gray-100 outline-none border-gray-200"
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-4">
            <div>
              <p className="font-bold">Product personalization</p>
              <p>
                For products customers may request additional personal details
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={productData.isPersonal} onChange={e => handleChange(e, "isPersonal")} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-8">
            <p className="font-bold">Tracking data</p>
            <div>
              <label className="block text-sm font-bold mb-1">
                Facebook Pixel
              </label>
              <input
                type="text"
                value={productData.facebookPixel}
                onChange={e => handleChange(e, "facebookPixel")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Google Analytics
              </label>
              <input
                type="text"
                value={productData.googleAnalytics}
                onChange={e => handleChange(e, "googleAnalytics")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type title"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-20 space-y-6">
          <div className="border px-4 py-4 text-neutral-600 space-y-4 shadow-lg">
            <div>
              <p className="font-bold">Product attribute</p>
              <p>Product description on sample search page</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold">Categories</label>
              <select
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={productData.categoryId}
                defaultValue="" // Sử dụng defaultValue để thiết lập giá trị mặc định
                required
              >
                <option value="0" disabled>
                  Select Categories
                </option>
                <option value="1">Fashion</option>
                <option value="2">Beauty</option>
                <option value="3">Gaming</option>
                <option value="4">Kitchen</option>
                <option value="5">Home Decor</option>
                <option value="6">Office Supplies</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold">CR (%)</label>
              <input
                type="number"
                value={productData.cr}
                onChange={e => handleChange(e, "cr")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type CR %"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold">AOV</label>
              <input
                type="number"
                value={productData.aov}
                onChange={e => handleChange(e, "aov")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type AOV"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold">
                Payment gateway unit
              </label>
              <input
                type="text"
                value={productData.paymentGatewayUnit}
                onChange={e => handleChange(e, "paymentGatewayUnit")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type unit"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold">Fullfill unit</label>
              <input
                type="text"
                value={productData.fullfillUnit}
                onChange={e => handleChange(e, "fullfillUnit")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Type unit"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold">Content</label>
              <textarea
                value={productData.content}
                onChange={e => handleChange(e, "content")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-3 max-h-40 min-h-20"
                placeholder="Type unit"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold">Country target</label>
              <select
                value={productData.countryTarget}
                onChange={e => handleChange(e, "countryTarget")}
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                required
              >
                <option value="" disabled>
                  Select a region
                </option>
                <option value="US">US</option>
                <option value="EU">EU</option>
                <option value="ASIAN">ASIAN</option>
                <option value="AFRICA">AFRICA</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold">Gender target</label>
              <select
                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={productData.genderTarget}
                onChange={e => handleChange(e, "genderTarget")}
                required
                defaultValue={0}
              >
                <option value={0}>All</option>
                <option value={1}>MALE</option>
                <option value={2}>FEMALE</option>
              </select>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="space-y-2 w-full">
                <label className="block text-xs font-bold">Start Age</label>
                <input
                  type="text"
                  value={productData.startAge}
                  onChange={e => handleChange(e, "startAge")}
                  className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Type "
                  required
                />
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-xs font-bold">End Age</label>
                <input
                  type="text"
                  value={productData.endAge}
                  onChange={e => handleChange(e, "endAge")}
                  className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Type "
                  required
                />
              </div>
            </div>
          </div>

          <div className="border px-4 py-4 text-neutral-600 space-y-4 shadow-lg">
            <p className="font-bold">Product availability</p>
            <p className="text-sm">
              Manage the availability of the product in these channels
            </p>

            <div className="flex items-center">
              <input value={productData.status} onChange={e => handleChange(e, "status")} type="checkbox" className="rounded cursor-pointer" />
              <span className="ml-2 text-sm">Available listing product</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="rounded cursor-pointer" checked={serviceT.premium} onChange={e => handleServiceType(e, "premium")} />
              <span className="ml-2 text-sm mr-1">Premium </span>
              <Crown size={16} color="black" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="rounded cursor-pointer" checked={serviceT.free} onChange={e => handleServiceType(e, "free")} />
              <span className="ml-2 text-sm mr-1">Free </span>
            </div>
          </div>
          <div className="border px-4 py-4 text-neutral-600 space-y-4 shadow-lg">
            <div className="flex flex-row items-center space-x-2">
              <span className="font-bold">Set as Home page</span>
              <div className="home-alert cursor-pointer">
                <CircleAlert size={20} />
                <Tooltip anchorSelect=".home-alert" place="top">
                  Set domain
                </Tooltip>
              </div>
            </div>
            <div className="text-sm">
              <span>
                Select a domain to assign this page as the Home page for the
                specified domain.
              </span>
            </div>
            <button className="border p-2 rounded font-bold hover:bg-neutral-300">
              Select domain
            </button>{" "}
            (dang phat trien....)
          </div>
        </div>
      </div>
    </div>
  );
}
