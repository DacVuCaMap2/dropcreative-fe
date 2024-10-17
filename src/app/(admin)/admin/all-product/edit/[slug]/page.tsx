import GetApi from '@/api/GetApi';
import EditProductComponent from '@/components/admin-component/product-component/EditProductComponent'
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
    if (response.product) {
        productData = {
            id: response.product.id,
            title: response.product.title,
            description: response.product.description,
            shippingDescription: response.productDetail.shippingDescription ? response.productDetail.shippingDescription : "",
            warrantyDescription: response.productDetail.warrantyDescription ? response.productDetail.warrantyDescription : "",
            accountId: response.product.accountId,
            categoryIds: response.product.categoryIds,
            seasonIds: response.productDetail.seasonIds,
            holidayIds: response.productDetail.holidayIds,
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
        images = response.images.map((item: any) => {
            return { id: item.id, productId: item.productId, url: item.url, name: item.fileName, isMain: item.isMain };
        })
        listVariantDetails = response.productVariants.map(((item: any) => {
            const image = images.find(img=>img.id===item.id);
            return {
                name: item.value,
                price: item.price,
                comparePrice: item.comparePrice,
                quantity: item.quantity,
                image: image,
                sku: item.sku,
                barcode: item.barcode,
                fileName: image ? image.name : "" ,
                value: item.value,
                status: item.status,
            }
        }))
    }
    else {
        return notFound();
    }

    console.log(response);
    return (
        <EditProductComponent accountId={accId} productData={productData} videos={videos} images={images} />
    )
}
