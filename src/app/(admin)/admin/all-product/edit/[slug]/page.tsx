"use server"
import GetApi from '@/api/GetApi';
import EditProductComponent from '@/components/admin-component/product-component/EditProductComponent'
import { sortImageIsMainFirst, stringToVariant, tranObjectFromStrTwoKey } from '@/data/function';
import ImageEdit from '@/model/ImageEdit';
import Product, { getNewProduct } from '@/model/Product';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'
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
export default async function page({ params }: { params: { slug: string } }) {
    const cookieStore = cookies()
    let accId: string = "";  // Đặt kiểu là string

    const accountIdCookie = cookieStore.get('account_id');
    if (accountIdCookie) {
        accId = accountIdCookie.value; // Sử dụng .value để lấy giá trị chuỗi
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + params.slug;
    const response = await GetApi(url);
    let productData: Product = getNewProduct();
    let videos: any[] = [];
    let images: ImageEdit[] = [];
    const listVariant: productVariant[] = [];
    let listVariantDetails: variantDetails[] = [];
    let comboSaleList: ComboSale[] = [];
    let boughtTogetherList: BoughtTogether[] = []
    if (response.product) {
        productData = {
            id: response.product.id,
            title: response.product.title,
            description: response.productDetail.description,
            shippingDescription: response.productDetail.shippingDescription ? response.productDetail.shippingDescription : "",
            warrantyDescription: response.productDetail.warrantyDescription ? response.productDetail.warrantyDescription : "",
            accountId: response.product.accountId,
            categoryIds: response.product.categoryIds,
            season: response.productDetail.season,
            holiday: response.productDetail.holiday,
            status: response.product.status,
            serviceType: response.product.serviceType,
            variant: response.product.variant,
            price: response.product.price,
            comparePrice: response.product.comparePrice,
            costPerPrice: response.product.costPerPrice,
            shippingFee: response.product.shippingFee,
            cr: response.productDetail.cr,
            aov: response.productDetail.aov,
            countryTarget: response.productDetail.countryTarget,
            genderTarget: response.productDetail.genderTarget,
            content: response.productDetail.content,
            contentCalling: response.productDetail.contentCalling,
            domain: response.productDetail.domain,
            fullfillUnit: response.productDetail.fullfillUnit,
            facebookPixel: response.productDetail.facebookPixel,
            googleAnalytics: response.productDetail.googleAnalytics,
            paymentGatewayUnit: response.productDetail.paymentGatewayUnit,
            paymentMethod: response.productDetail.paymentMethod,
            isPersonal: response.productDetail.isPersonal,
            startAge: response.productDetail.startAge,
            endAge: response.productDetail.endAge,
            productVariants: []
        }
        videos = response.videos;
        images = [...response.images.map((item: any) => {
            return { id: item.id, productId: item.productId, url: item.url, name: item.fileName, isMain: item.isMain };
        })]
        // images = sortImageIsMainFirst(response.images);

        /// get variant select
        const arrVariantsDetails: string[] = response.productVariants.map((item: any) => {
            return item.value;
        })
        const variantsSelectList = stringToVariant(response.product.variant, arrVariantsDetails);
        const arrVarianTitle = response.product.variant.split("./");
        for (let i = 0; i < arrVarianTitle.length; i++) {
            listVariant.push({
                optionName: arrVarianTitle[i],
                optionValue: variantsSelectList[i],
                optionInput: ""
            })
        }
        listVariantDetails = response.productVariants.map(((item: any) => {
            let image = images.find(img => img.id === item.imageId);
            image = image ? image : images[0];
            return {
                id:item.id,
                name: item.value,
                price: item.price,
                comparePrice: item.comparePrice,
                quantity: item.quantity,
                image: image,
                sku: item.sku,
                barcode: item.barcode,
                fileName: image ? image.name : "",
                value: item.value,
                status: item.status,
            }
        }))

        //combosale 
        const tempComboSale = tranObjectFromStrTwoKey(response.productDetail.comboSale);
        comboSaleList = tempComboSale.map((item: any) => {
            return { quantity: item.key1, value: item.key2 }
        })

        //bought together
        const tempBoughtTogether = tranObjectFromStrTwoKey(response.productDetail.boughtTogether);

        /// search Product
        const boughtTogetherPromises = tempBoughtTogether.map(async (item: any, index) => {
            if (index === 0) {
                return { name: response.product.title, imgUrl: "", id: response.product.id, value: parseFloat(item.key2) }
            }
            if (index > 0) {
                const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + item.key1;
                const productChild = await GetApi(url);
                if (productChild.product) {
                    return {
                        name: productChild.product.title,
                        imgUrl: productChild.images.length > 0 ? process.env.NEXT_PUBLIC_API_URL+productChild.images[0].url : "",
                        id: productChild.product.id,
                        value: parseFloat(item.key2)
                    };
                }
                return null;
            }
            return null;
        });
        const boughtTogetherResults = await Promise.all(boughtTogetherPromises);
        boughtTogetherList = boughtTogetherResults.filter(item => item !== null);
        for (let i = 0; i < 3; i++) {
            if (!boughtTogetherList[i]) {
                boughtTogetherList[i]={
                    name: "",
                    imgUrl: "",
                    id: -1,
                    value: 0,
                }
            }
        }
    }
    else {
        return notFound();
    }

    console.log(response);
    return (
        <EditProductComponent accountId={accId} productData={productData} videos={videos}
            images={images} listVariant={listVariant} listVariantDetails={listVariantDetails} comboSaleList={comboSaleList} boughtTogetherList={boughtTogetherList} />
    )
}

