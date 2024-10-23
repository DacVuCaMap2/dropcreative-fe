import JSZip from "jszip";
import { gender, generalServiceType } from "./generalData";
import saveAs from "file-saver";

export const handleDownloadToTxtPublic = async (productData:any,setLoadingDownLoad:any) => {
    const listServiceType = generalServiceType;
    const listGender = gender;
    const zip = new JSZip();
    const jsonData = productData;
    const jsonString = JSON.stringify(jsonData, null, 2);
    const txt = `title: ${productData.product.title}\nLicense: ${listServiceType.find(item => item.value === productData.product.serviceType)?.title}\nprice: $${productData.product.price}\nCompare price: $${productData.product.comparePrice}\nCost per Price: $${productData.product.costPerPrice}\nShipping fee: $${productData.product.shippingFee}\nCr: ${productData.productDetail.cr}%\nAOV: ${productData.productDetail.aov}\nCountry target: ${productData.productDetail.countryTarget}\nGender: ${listGender.find(gen => gen.value === productData.productDetail.genderTarget)?.title}\nAge:${productData.productDetail.startAge}-${productData.productDetail.endAge}\nContent: ${productData.productDetail.content} `
    const fetchImagePromises = productData.images.map(async (img: any) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + img.url);
        const blob = await response.blob();
        const fileName = img.url.split('/').pop();
        zip.file(`images/${fileName}`, blob);
    })

    const fetchVideoPromises = productData.videos.map(async (video: any) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + video.url);
        const blob = await response.blob();
        const fileName = video.url.split('/').pop();
        zip.file(`videos/${fileName}`, blob);
    })

    setLoadingDownLoad(true);
    await Promise.all([...fetchImagePromises, ...fetchVideoPromises]);
    setLoadingDownLoad(false);
    zip.file("data.json", jsonString);
    zip.file("note.txt", txt);

    // Tạo file ZIP
    const content = await zip.generateAsync({ type: "blob" });

    // Tải file ZIP về
    saveAs(content, "data.zip");
}