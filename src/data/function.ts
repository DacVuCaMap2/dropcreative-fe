export function validatePostData(postData: any) {
    // Function to check for empty strings
    const isEmptyString = (value: any) => typeof value === 'string' && value.trim() === '';

    // Check accountId
    if (isEmptyString(postData.accountId)) {
        return "accountId cannot be empty.";
    }
    // Check aov
    if (typeof postData.aov !== 'number') {
        return "aov must be a number.";
    }
    // Check categoryId
    if (postData.categoryIds.length === 0) {
        return "Choose a category.";
    }
    if (postData.holiday.length === 0) {
        return "Choose holiday.";
    }
    if (postData.season.length === 0) {
        return "Choose seasons.";
    }
    // Check comparePrice
    if (typeof postData.comparePrice !== 'number') {
        return "Compare Price must be a number.";
    }
    // Check content
    if (isEmptyString(postData.content)) {
        return "Content cannot be empty.";
    }
    // Check contentCalling
    if (isEmptyString(postData.contentCalling)) {
        return "Content calling cannot be empty.";
    }
    // Check costPerPrice
    if (typeof postData.costPerPrice !== 'number') {
        return "costPerPrice must be a number.";
    }
    // Check countryTarget
    if (isEmptyString(postData.countryTarget)) {
        return "Country Target cannot be empty.";
    }
    // Check cr
    if (typeof postData.cr !== 'number') {
        return "cr must be a number.";
    }
    // Check description
    if (isEmptyString(postData.description)) {
        return "description cannot be empty.";
    }
    // // Check domain
    // if (isEmptyString(postData.domain)) {
    //     return "domain cannot be empty.";
    // }
    // Check endAge
    if (typeof postData.endAge !== 'number') {
        return "endAge must be a number.";
    }
    // // Check facebookPixel
    // if (isEmptyString(postData.facebookPixel)) {
    //     return "Facebook Pixel cannot be empty.";
    // }
    // Check fullfillUnit
    if (isEmptyString(postData.fullfillUnit)) {
        return "Full Fill Unit cannot be empty.";
    }
    // Check genderTarget
    if (typeof postData.genderTarget !== 'number') {
        return "Gender Target must be a number.";
    }
    // // Check googleAnalytics
    // if (isEmptyString(postData.googleAnalytics)) {
    //     return "Google Analytics cannot be empty.";
    // }
    // Check isPersonal
    if (typeof postData.isPersonal !== 'boolean') {
        return "isPersonal must be a boolean.";
    }
    // Check paymentGatewayUnit
    if (isEmptyString(postData.paymentGatewayUnit)) {
        return "Payment Gateway unit cannot be empty.";
    }
    // // Check paymentMethod
    // if (isEmptyString(postData.paymentMethod)) {
    //     return "Payment method cannot be empty.";
    // }
    // Check price
    if (typeof postData.price !== 'number') {
        return "price must be a number.";
    }
    // Check productVariants
    if (!Array.isArray(postData.productVariants)) {
        return "productVariants must be an array.";
    }
    // Check serviceType
    if (typeof postData.serviceType !== 'number') {
        return "serviceType must be a number.";
    }
    // Check shippingFee
    if (typeof postData.shippingFee !== 'number') {
        return "shippingFee must be a number.";
    }
    // Check startAge
    if (typeof postData.startAge !== 'number') {
        return "startAge must be a number.";
    }
    // Check status
    if (typeof postData.status !== 'number') {
        return "status must be a number.";
    }
    // Check title
    if (isEmptyString(postData.title)) {
        return "title cannot be empty.";
    }
    // Check variant
    if (typeof postData.variant !== 'string') {
        return "variant must be a string.";
    }

    return ""; // No errors
}

export const stringToVariant = (variantTitle: string, productVariant: string[]) : string[][] => {
    const listResult: string[][] = [[], [], []];
    const listVariantName: string[] = variantTitle.split("./");
    productVariant.map(str => {
        const arrStr = str.split(',');
        for (let i = 0; i < listVariantName.length; i++) {
            let flag = true;
            if (!listResult[i].find(item=>item===arrStr[i]) && flag) {
                listResult[i].push(arrStr[i]);
                flag = false;
            }
        }
    })
    // console.log(listResult);
    // //
    // let strResult = "";
    // for (let i = 0; i < listResult.length; i++) {
    //     if (listResult[i].length>0 && i!=0) {
    //         strResult+="|"
    //     }
    //     if (listResult[i].length > 0) {
    //         for (let j = 0; j < listResult[i].length; j++) {
    //             strResult+=listResult[i][j]
    //             if (j<listResult[i].length-1) {
    //                 strResult+="./";
    //             }
    //         }
            
    //     }
    // }
    return listResult;
}