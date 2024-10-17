"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AddProductComponent.css";
import { CircleAlert, Crown, FileImage, Plus, Save, Trash, Type, X } from "lucide-react";
import { Tooltip } from "react-tooltip";
import TinyMCEEditor from "@/components/TinyMCE/TinyMCEEditor";
import Product, { getNewProduct } from "@/model/Product";
import Image from "next/image";
import PhotoGallery from "@/components/imgdrag/ImageDrag";
import Modal from 'react-modal';
import { div, form } from "framer-motion/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { message, Select, Space } from "antd";
import Message from "@/components/common-component/Message";
import { validatePostData } from "@/data/function";
import { generalCategoriesSelect, generalHolidayList, generalOptionHoliday, generalOptionsCat, generalOptionSeasons, generalSeasonList } from "@/data/generalData";
import GetApi from "@/api/GetApi";
import { ScaleLoader } from "react-spinners";
import PhotoGalleryEdit from "@/components/imgdrag/ImageDragEdit";
import PutApi from "@/api/PutApi";
type productVariant = {
    optionName: string;
    optionValue: string[];
    optionInput: string;
};
type variantDetails = {
    id:any;
    name: string;
    price: number;
    comparePrice: number;
    quantity: number;
    image: any | null;
    sku: string;
    barcode: string;
    fileName: string;
    value: string;
    status: number;
};
type ComboSale = {
    quantity: number,
    value: number
}
type BoughtTogether = {
    name: string,
    imgUrl: string,
    id: number,
    value: number,
}
type Props = {
    accountId: string,
    productData: Product,
    videos: any[],
    images: any[],
    listVariant : productVariant[],
    listVariantDetails : variantDetails[],
    comboSaleList : ComboSale[],
    boughtTogetherList: BoughtTogether[]
}
export default function EditProductComponent(props: Props) {
    const accountId = props.accountId;
    // console.log(props.listVariant)
    const [loading, setLoading] = useState(0);
    const [productData, setProductData] = useState<Product>(props.productData);
    const [listVariant, setListVariant] = useState<productVariant[]>(props.listVariant);
    const [description, setDescription] = useState(`<p>${productData.description}</p>`);
    const [shippingDesc, setShippingDesc] = useState(`<p>${productData.shippingDescription}</p>`);
    const [WarrantyDesc, setWarrantyDesc] = useState(`<p>${productData.warrantyDescription}</p>`);
    const [contentCalling, setContentCalling] = useState(`<p>${productData.contentCalling}</p>`);
    const [videos, setVideos] = useState<any[]>(props.videos);
    const [photos, setPhotos] = useState<any[]>(props.images);
    const [isOpenSelectPhoto, setIsOpenSelectPhoto] = useState(false);
    const [isOpenSelectProduct, setIsOpenSelectProduct] = useState(false);
    const [indCurrent, setIndCurrent] = useState(0);
    const [listProductSelect, setListProductSelect] = useState<any[]>([]);
    const [listComboSale, setListComboSale] = useState<ComboSale[]>(props.comboSaleList);
    const [selectDesc, setSelectDesc] = useState(0);
    const [thisBoughtTogether, setThisBoughtTogether] = useState<BoughtTogether>(props.boughtTogetherList[0]);
    const tempBoughtTogetherList = props.boughtTogetherList.map((item:BoughtTogether,index)=>{})
    const [listBoughtTogerther, setListBoughtTogether] = useState<BoughtTogether[]>([props.boughtTogetherList[1],props.boughtTogetherList[2]]);
    /// just save editor tiny

    ///get list Product select
    useEffect(() => {

        if (listProductSelect.length == 0) {
            const url = process.env.NEXT_PUBLIC_API_URL + `/api/product?accountId=${accountId}&size=30&page=1`;
            const fetchData = async () => {
                const response = await GetApi(url);
                if (Array.isArray(response.data)) {
                    setListProductSelect(response.data);
                }
            }
            fetchData();
        }
    }, [])




    const [serviceT, setServiceT] = useState({
        free: productData.serviceType === 1 || productData.serviceType === 3 ? true : false
        , premium: productData.serviceType === 2 || productData.serviceType === 3 ? true : false
    });

    const [listVariantDetails, setListVariantDetails] = useState<variantDetails[]>(props.listVariantDetails);
    const [listCat, setListCat] = useState<any[]>(productData.categoryIds);
    const [listSea, setListSeasons] = useState<any[]>(productData.season ? productData.season : []);
    const [listHol, setListHolidays] = useState<any[]>(productData.holiday ? productData.holiday : []);
    const optionsCategories = generalOptionsCat;
    const catList = generalCategoriesSelect;
    const getCatCurrentEdit = (): any[] => {
        const result: string[] = []
        productData.categoryIds.forEach((item: any) => {
            const title = catList.find(cat => cat.value === parseFloat(item))?.title
            if (title) {
                result.push(title);
            }
        })
        return result;
    }
    const optionSeasons = generalOptionSeasons;
    const seasonList = generalSeasonList;
    const getSeaCurrentEdit = (): any[] => {
        const result: string[] = []
        productData.categoryIds.forEach((item: any) => {
            const title = seasonList.find(sea => sea.value === parseFloat(item))?.title
            if (title) {
                result.push(title);
            }
        })
        return result;
    }
    const optionHolidays = generalOptionHoliday;
    const holidayList = generalHolidayList;

    const openModal = () => {
        document.body.style.overflow = 'hidden';
        setIsOpenSelectPhoto(true);
    };

    const closeModal = () => {
        document.body.style.overflow = 'unset';
        setIsOpenSelectPhoto(false);
    };
    const openModalProduct = () => {
        document.body.style.overflow = 'hidden';
        setIsOpenSelectProduct(true);
    };

    const closeModalProduct = () => {
        document.body.style.overflow = 'unset';
        setIsOpenSelectProduct(false);
    };


    const handleEditorChange = (newContent: any) => {
        setDescription(newContent);
    };
    const handleShippingChange = (newContent: any) => {
        setShippingDesc(newContent);
    };
    const handleWarrantyChange = (newContent: any) => {
        setWarrantyDesc(newContent);
    };
    const handleContentCalling = (newContent: any) => {
        setContentCalling(newContent);
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
            key === "shippingFee" || key === "aov" || key === "cr" || key === "categoryId" || key === "startAge" || key === "endAge" || key === "genderTarget"
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
                    id:null,
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

    const router = useRouter();

    const handleSubmit = async () => {
        const productVariants = listVariantDetails.map((item: variantDetails, index) => {
            return {
                id:item.id,value: item.name, status: item.status, price: item.price, comparePrice: item.comparePrice, quantity: item.quantity,
                sku: item.sku, barcode: item.barcode, fileName: item.image ? `${index}-${accountId}image${Date.now()}` : ''
            }
        })
        let comboSale = "";
        const arrComboSaleQuant: string[] = [];
        const arrComboSaleVal: string[] = [];
        listComboSale.forEach(item => {
            arrComboSaleQuant.push(item.quantity.toString());
            arrComboSaleVal.push(item.value.toString());
        })
        if (arrComboSaleQuant.length > 0 && arrComboSaleVal.length > 0 && arrComboSaleQuant.length === arrComboSaleVal.length) {
            comboSale = arrComboSaleQuant.join('./') + "|" + arrComboSaleVal.join('./');
        }
        // let boughtTogether = "0|" + thisBoughtTogether.value;
        let boughtTogether = productData.id + "|" + thisBoughtTogether.value;
        const arrBTId: string[] = [];
        const arrBTval: string[] = [];
        listBoughtTogerther.forEach(item => {
            if (item.id != -1) {
                arrBTId.push(item.id.toString());
                arrBTval.push(item.value.toString());
            }
        })
        if (arrBTId.length > 0 && arrBTval.length > 0 && arrBTId.length === arrBTval.length) {
            boughtTogether =productData.id + "./" + arrBTId.join("./") + "|" + thisBoughtTogether.value + "./" + arrBTval.join("./");
        }
        let serviceType = 4;
        serviceType = serviceT.free && serviceT.premium ? 3 : serviceType;
        serviceType = serviceT.free && !serviceT.premium ? 1 : serviceType;
        serviceType = !serviceT.free && serviceT.premium ? 2 : serviceType;
        const variantValue = listVariant.map(item => item.optionName).join('./');
        const postData = {
            ...productData, status: 1, productVariants: productVariants, serviceType: serviceType
            , accountId: parseFloat(accountId), variant: variantValue
            , contentCalling: contentCalling, description: description
            , comboSale: comboSale, boughtTogether: boughtTogether, categoryIds: listCat
            , holiday: listHol
            , season: listSea
            , shippingDescription: shippingDesc
            , warrantyDescription: WarrantyDesc
        };
        let { id, ...filterPostData } = postData;
        let errMess = "";

        if (errMess) {
            message.error(errMess);
            return;
        }
        const formData = new FormData();

        const imagePost : any[] = [];
        const videoPost : any[] = [];
        if (photos.length > 0) {
            photos.forEach((photo, index) => {
                if (photo instanceof File) {
                    formData.append(`images`, photo);
                }
                else{
                    imagePost.push({id:photo.id,isMain:photo.isMain});
                }
            });
        }

        if (videos.length > 0) {
            videos.forEach((video, index) => {
                if (video instanceof File) {
                    formData.append(`videos`, video);
                }
                else{
                    videoPost.push(video.id);
                }
            });
        }
        const finalData : any = {...filterPostData,imageIds:imagePost,videoIds:videoPost};
        console.log(finalData);
        formData.append("data", JSON.stringify(finalData));
        errMess = validatePostData(filterPostData);
        // console.log(photos, videos);


        const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/"+productData.id
        try {
            setLoading(1);
            setTimeout(() => {
                setLoading(0)
            }, 3000);
            const response = await PutApi(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Thiết lập Content-Type cho formData
                },
            });
            console.log('Success:', response);
            // router.push('/admin/all-product');
            // window.location.href = '/admin/all-product'
        } catch (error) {
            console.error('Error:', error);
            // window.location.href = '/admin/all-product'
        }
    }

    const handleChangeCat = (value: any[]) => {
        let tempCat: any[] = [...listCat];
        tempCat = [];
        value.forEach(item => {
            const idCat = catList.find(cat => cat.title === item);
            if (idCat) {
                tempCat.push(idCat.value);
            }
        })
        setListCat(tempCat);
    }
    const handleChangeSeason = (value: any[]) => {
        console.log(value);
        let temSea: any[] = [...listSea];
        temSea = [];
        value.forEach(item => {
            const idSea = seasonList.find(sea => sea.title === item);
            if (idSea) {
                temSea.push(idSea.value);
            }
        })
        setListSeasons(temSea);
    }
    const handleChangeHoliday = (value: any[]) => {
        let tempHol: any[] = [...listHol];
        tempHol = [];
        console.log(holidayList);
        value.forEach(item => {
            const idHol = holidayList.find(hol => hol.title === item);
            if (idHol) {
                tempHol.push(idHol.value);
            }
        })
        setListHolidays(tempHol);
    }

    const handleChangeComboSale = (e: any, ind: number, key: string) => {
        let value = e.target.value;
        value = value ? parseFloat(value) : 0;
        const tempList = [...listComboSale].map((item: ComboSale, index) => {
            if (index === ind && value < 101) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setListComboSale(tempList);
    }

    const handleSelectProductBT = (select: any) => {
        const tempList = [...listBoughtTogerther].map((item: BoughtTogether, index) => {
            if (indCurrent === index) {
                return {
                    ...item
                    , name: select.title
                    , imgUrl: select.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${select.imageUrl}` : "/image/nophotos.png"
                    , id: select.id
                }
            }
            return item;
        })
        setListBoughtTogether(tempList);
        closeModalProduct();
    }
    const handleDelBT = (index: any) => {
        const tempList = [...listBoughtTogerther].map((item: BoughtTogether, ind) => {
            if (ind === index) {
                return {
                    ...item
                    , name: ""
                    , imgUrl: "/image/nophotos.png"
                    , id: -1
                }
            }
            return item;
        })
        setListBoughtTogether(tempList);
    }

    const handleChangeBT = (e: any, ind: number) => {
        let value = e.target.value;
        value = value ? parseFloat(value) : 0;
        const tempList = [...listBoughtTogerther].map((item: BoughtTogether, index) => {
            if (ind === index) {
                return {
                    ...item
                    , value: value
                }
            }
            return item;
        })
        setListBoughtTogether(tempList);
    }
    return (
        <div className="relative  flex justify-between items-center w-full flex-wrap">
            {loading === 1 &&
                <div className="flex items-center justify-center fixed top-0 left-0 z-50 h-screen w-screen bg-neutral-700 opacity-80">
                    <ScaleLoader color="white" height={100} width={10} />
                </div>
            }
            <div className="w-1/2">
                <p>
                    Build a landing page to display demos on search pages or sell products
                    on the market
                </p>
            </div>
            <button onClick={handleSubmit} className="sticky top-4 right-2 z-50 flex  items-center bg-blue-500 hover:bg-blue-600 text-xs font-bold text-white px-4 py-2 rounded">
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
                            <label className="block text-xs font-bold">Categories</label>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select Category"
                                defaultValue={getCatCurrentEdit()}
                                onChange={handleChangeCat}
                                options={optionsCategories}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold">Seasons</label>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select Season"
                                defaultValue={[]}
                                onChange={handleChangeSeason}
                                options={optionSeasons}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold">Holiday</label>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select Season"
                                defaultValue={[]}
                                onChange={handleChangeHoliday}
                                options={optionHolidays}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </div>


                        {/* <div className="space-y-2">
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
                  initialValue={""}
                  onEditorChange={handleContentCalling}
                />
              </div>
            </div> */}

                        <div className="space-y-2">
                            <div className="flex flex-row items-center space-x-5 ">
                                <button onClick={() => setSelectDesc(0)} className={`text-sm font-bold border-black   ${selectDesc === 0 ? 'border-b-2' : ''}`}>Description</button>
                                <button onClick={() => setSelectDesc(1)} className={`text-sm font-bold border-black   ${selectDesc === 1 ? 'border-b-2' : ''}`}>Shipping</button>
                                <button onClick={() => setSelectDesc(2)} className={`text-sm font-bold border-black   ${selectDesc === 2 ? 'border-b-2' : ''}`}>Return & Warranty</button>
                            </div>
                            {/* description */}
                            <div className={` ${selectDesc === 0 ? '' : 'hidden'}`}>
                                <TinyMCEEditor
                                    initialValue={description}
                                    onEditorChange={handleEditorChange}
                                />
                            </div>
                            <div className={`${selectDesc === 1 ? '' : 'hidden'}`}>
                                <TinyMCEEditor
                                    initialValue={shippingDesc}
                                    onEditorChange={handleShippingChange}
                                />
                            </div>
                            <div className={`${selectDesc === 2 ? '' : 'hidden'}`}>
                                <TinyMCEEditor
                                    initialValue={WarrantyDesc}
                                    onEditorChange={handleWarrantyChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border px-4 text-neutral-600 space-y-6 shadow-lg py-8">
                        <div className="flex flex-row justify-between items-center ">
                            <span className="font-bold">
                                Videos
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
                                {videos.map((item: any, index) => {
                                    if (item instanceof File) {
                                        return (<div key={index} className="mb-4 rounded-2xl overflow-auto shadow-xl relative min-h-40">
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
                                        </div>)
                                    }
                                    else {
                                        return (<div key={index} className="mb-4 rounded-2xl overflow-auto shadow-xl relative min-h-40">
                                            <video
                                                width="320"
                                                height="240"
                                                controls
                                                src={process.env.NEXT_PUBLIC_API_URL + item.url} // Tạo URL tạm thời cho video
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className="absolute right-2 top-2">
                                                <button onClick={() => setVideos(videos.filter((vid: File, ind) => ind != index))} className="p-2 bg-white">
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>)
                                    }
                                })}
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



                    <PhotoGalleryEdit photos={photos} setPhotos={setPhotos} />

                    <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-4">
                        <span className="font-bold">Pricing</span>

                        <div className="flex flex-row flex-wrap">
                            <div className="flex flex-col space-y-1 w-1/3 mr-6 mb-4">
                                <span className="font-bold text-neutral-500 text-sm">
                                    Price
                                </span>
                                <div className="flex">
                                    <div className="flex text-gray-500 bg-gray-300 h-full font-medium text-center items-center rounded-s-lg px-4">
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
                                    <div className="flex text-gray-500 bg-gray-300 h-full font-medium text-center items-center rounded-s-lg px-4">
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
                                    <div className="flex text-gray-500 bg-gray-300 h-full font-medium text-center items-center rounded-s-lg px-4">
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
                                    <div className="flex text-gray-500 bg-gray-300 h-full font-medium text-center items-center rounded-s-lg px-4">
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
                            <p className="font-bold">Payment method</p>
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
                                    Variant
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
                                                                        src={variantItem.image instanceof File ? URL.createObjectURL(variantItem.image) : process.env.NEXT_PUBLIC_API_URL+variantItem.image.url}
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
                                                                            {photos.map((item: any, photoInd) => {
                                                                                const urlImage = (item instanceof File) ?  URL.createObjectURL(item) : process.env.NEXT_PUBLIC_API_URL+item.url;
                                                                                return (
                                                                                    <div onClick={() => handleSelectVariantImg(item)} key={photoInd} className="flex flex-col items-center rounded-lg border shadow-xl overflow-hidden">
                                                                                        <Image
                                                                                            quality={50}
                                                                                            src={urlImage} // Tạo URL tạm thời cho ảnh
                                                                                            alt={item.name}
                                                                                            width={144}
                                                                                            height={144}
                                                                                            className="w-36 h-36 object-cover" // Kích thước ảnh
                                                                                        ></Image>
                                                                                    </div>
                                                                                )
                                                                            })}
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

                        {videos.length > 0 &&
                            <div className="space-y-2">
                                <label className="block text-xs font-bold">Videos</label>
                                {videos.length > 0 &&
                                    <div className="flex flex-row border-t pt-4 justify-center space-x-4 w-full">
                                        {videos.map((item: any, index) => {
                                            if (item instanceof File) {
                                                return (<div key={index} className="mb-4 rounded-2xl overflow-auto shadow-xl relative">
                                                    <video
                                                        className="w-full h-full"
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
                                                </div>)
                                            }
                                            else {
                                                return (<div key={index} className="mb-4 rounded-2xl overflow-auto shadow-xl relative">
                                                    <video
                                                        className="w-full h-full"
                                                        controls
                                                        src={process.env.NEXT_PUBLIC_API_URL + item.url} // Tạo URL tạm thời cho video
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className="absolute right-2 top-2">
                                                        <button onClick={() => setVideos(videos.filter((vid: File, ind) => ind != index))} className="p-2 bg-white">
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </div>)
                                            }
                                        })}
                                    </div>}
                            </div>
                        }


                        {photos.length > 0 &&
                            <div className="space-y-2">
                                <label className="block text-xs font-bold">Photos</label>
                                {photos.length > 0 && (
                                    <div className="grid grid-cols-5 gap-4 border-t pt-4 ">
                                        {photos.map((item: any, index) => {
                                            if (item instanceof File) {
                                                return (
                                                    <div key={index} className="flex flex-col items-center rounded-lg border shadow-xl">
                                                        <img
                                                            src={URL.createObjectURL(item)} // Tạo URL tạm thời cho ảnh
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover" // Kích thước ảnh
                                                        />
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div key={index} className="flex flex-col items-center rounded-lg border shadow-xl">
                                                        <img
                                                            src={process.env.NEXT_PUBLIC_API_URL+item.url} // Tạo URL tạm thời cho ảnh
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover" // Kích thước ảnh
                                                        />
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        }
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
                    </div>


                    <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-8">
                        <div className="flex flex-row justify-between items-center ">
                            <div>
                                <span className="font-bold">
                                    Combo Sale
                                </span>
                                <p>Set quantity and sale percent to buy more save more</p>
                            </div>
                            <div className="flex flex-col">
                                <button onClick={() => { const tempListCombo: ComboSale[] = [...listComboSale]; tempListCombo.push({ quantity: 0, value: 0 }); setListComboSale(tempListCombo) }} className="text-blue-500 hover:underline">
                                    Add
                                </button>
                            </div>
                        </div>
                        {listComboSale.length > 0 &&
                            <div className="">
                                {listComboSale.map((item: ComboSale, index) => (
                                    <div key={index} className="flex flex-row space-x-4 space-y-4 items-center justify-center">
                                        <div className="flex flex-col mt-4">
                                            <label htmlFor="" className="font-bold text-sm">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                onChange={e => handleChangeComboSale(e, index, "quantity")}
                                                value={item.quantity === 0 ? '' : item.quantity}
                                                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                                placeholder="Type item quantity"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-bold text-sm">
                                                Sale Percent (%)
                                            </label>
                                            <input
                                                type="number"
                                                value={item.value === 0 ? '' : item.value}
                                                onChange={e => handleChangeComboSale(e, index, "value")}
                                                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                                placeholder="Type sale percent"
                                                required
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                onClick={() => { const tempList = [...listComboSale].filter((item: ComboSale, childInd) => childInd != index); setListComboSale(tempList) }}
                                                className="p-2 hover:bg-gray-200 rounded"
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-8">
                        <div className="flex flex-row justify-between items-center ">
                            <div>
                                <span className="font-bold">
                                    Bought Together
                                </span>
                                <p>Set quantity and sale percent to buy more save more</p>
                            </div>
                        </div>
                        {listBoughtTogerther.length > 0 &&
                            <div className="">
                                <div className="flex flex-row justify-center items-center space-x-2 border-b pb-2 mb-4 text-sm font-bold">
                                    <div className="w-full">
                                        <span>Product</span>
                                    </div>
                                    <div className="w-1/3 ">
                                        <p className="">Percent (%)</p>
                                    </div>
                                    <div
                                        className="p-4"
                                    >
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-center items-center space-x-2 border-b pb-2 mb-4">
                                        <div className="flex flex-row w-full overflow-hidden items-center space-x-2">
                                            {(photos.length > 0 && photos[0] instanceof File) && <Image src={ URL.createObjectURL(photos[0])} alt="image" width={50} height={50} className="rounded"></Image> }
                                            {(photos.length > 0 && !(photos[0] instanceof File)) && <Image src={ process.env.NEXT_PUBLIC_API_URL+photos[0].url} alt="image" width={50} height={50} className="rounded"></Image> }
                                            {(photos.length === 0 ) && <Image src={"/image/nophotos.png"} alt="image" width={50} height={50} className="rounded"></Image> }
                                            <p className="truncate">{productData.title ? productData.title : "This Product"}</p>
                                        </div>
                                        <div className="w-1/3">
                                            <input
                                                type="number"
                                                onChange={(e) => setThisBoughtTogether({ ...thisBoughtTogether, value: e.target.value ? parseFloat(e.target.value) : 0 })}
                                                value={thisBoughtTogether.value === 0 ? '' : thisBoughtTogether.value}
                                                className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                                placeholder="Type item quantity"
                                                required
                                            />
                                        </div>
                                        <div
                                            className="p-5"
                                        >
                                        </div>
                                    </div>
                                </div>
                                {listBoughtTogerther.map((item: BoughtTogether, index) => (
                                    <div key={index}>
                                        {item.id != -1 ?
                                            <div className="flex flex-row justify-center items-center space-x-2 border-b pb-2 mb-4">
                                                <div className="flex flex-row w-full overflow-hidden items-center space-x-2 min-h-[50px]">
                                                    <Image src={item.imgUrl} alt="image" width={50} height={50} className="rounded"></Image>
                                                    <p className="truncate">{item.name}</p>
                                                </div>
                                                <div className="w-1/3">
                                                    <input
                                                        type="number"
                                                        onChange={(e) => handleChangeBT(e, index)}
                                                        value={item.value === 0 ? '' : item.value}
                                                        className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                                        placeholder="Type item quantity"
                                                        required
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleDelBT(index)}
                                                    className="p-2 hover:bg-gray-200 rounded"
                                                >
                                                    <X />
                                                </button>
                                            </div>
                                            :
                                            <div className="p-2">
                                                <button onClick={() => { openModalProduct(); setIndCurrent(index) }} className="flex flex-row justify-center items-center w-full py-2 border-neutral-300 border rounded hover:bg-neutral-200">
                                                    <Plus />
                                                    <span>Add product bought together</span>
                                                </button>

                                                <Modal
                                                    isOpen={isOpenSelectProduct}
                                                    onRequestClose={closeModalProduct}
                                                    contentLabel="Select Image"
                                                    className="modal relative"
                                                >
                                                    <button className="absolute top-2 right-2 bg-gray-200 p-2 rounded hover:bg-gray-400" onClick={closeModalProduct}>
                                                        <X />
                                                    </button>
                                                    <span className="border-b font-bold text-xl">Select an Product</span>
                                                    <div className="image-gallery p-2">
                                                        {listProductSelect.length > 0 && (
                                                            <div className="grid grid-cols-5 gap-4 pt-4 w-full">
                                                                {listProductSelect.map((proSelect: any, proInd) => (
                                                                    <div onClick={() => handleSelectProductBT(proSelect)} key={proInd} className="flex flex-col items-center rounded-lg border shadow-xl overflow-hidden">
                                                                        <Image
                                                                            src={proSelect.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${proSelect.imageUrl}` : '/image/nophotos.png'} // Tạo URL tạm thời cho ảnh
                                                                            alt={proSelect.name}
                                                                            width={144}
                                                                            height={144}
                                                                            className="w-36 h-36 object-cover" // Kích thước ảnh
                                                                        ></Image>
                                                                        <div className="h-20 overflow-hidden px-2">
                                                                            <span className="px-1 text-sm font-bold">{proSelect.title}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Modal>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
