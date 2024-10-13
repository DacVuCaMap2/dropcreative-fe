

export function validatePostData(postData:any) {
    // Hàm kiểm tra chuỗi rỗng
    const isEmptyString = (value:any) => typeof value === 'string' && value.trim() === '';

    // Kiểm tra accountId
    if (isEmptyString(postData.accountId)) {
        return "accountId không được để trống.";
    }
    // Kiểm tra aov
    if (typeof postData.aov !== 'number') {
        return "aov phải là một số.";
    }
    // Kiểm tra categoryId
    if (typeof postData.categoryId !== 'number' || postData.categoryId==0) {
        return "Choose Category";
    }
    // Kiểm tra comparePrice
    if (typeof postData.comparePrice !== 'number') {
        return "comparePrice phải là một số.";
    }
    // Kiểm tra content
    if (isEmptyString(postData.content)) {
        return "Content không được để trống.";
    }
    // Kiểm tra contentCalling
    if (isEmptyString(postData.contentCalling)) {
        return "Content calling không được để trống.";
    }
    // Kiểm tra costPerPrice
    if (typeof postData.costPerPrice !== 'number') {
        return "costPerPrice phải là một số.";
    }
    // Kiểm tra countryTarget
    if (isEmptyString(postData.countryTarget)) {
        return "countryTarget không được để trống.";
    }
    // Kiểm tra cr
    if (typeof postData.cr !== 'number') {
        return "cr phải là một số.";
    }
    // Kiểm tra description
    if (isEmptyString(postData.description)) {
        return "description không được để trống.";
    }
    // // Kiểm tra domain
    // if (isEmptyString(postData.domain)) {
    //     return "domain không được để trống.";
    // }
    // Kiểm tra endAge
    if (typeof postData.endAge !== 'number') {
        return "endAge phải là một số.";
    }
    // // Kiểm tra facebookPixel
    // if (isEmptyString(postData.facebookPixel)) {
    //     return "Facebook Pixel không được để trống.";
    // }
    // Kiểm tra fullfillUnit
    if (isEmptyString(postData.fullfillUnit)) {
        return "Full Fill Unit không được để trống.";
    }
    // Kiểm tra genderTarget
    if (typeof postData.genderTarget !== 'number') {
        return "genderTarget phải là một số.";
    }
    // // Kiểm tra googleAnalytics
    // if (isEmptyString(postData.googleAnalytics)) {
    //     return "Google Analytics không được để trống.";
    // }
    // Kiểm tra isPersonal
    if (typeof postData.isPersonal !== 'boolean') {
        return "isPersonal phải là một boolean.";
    }
    // Kiểm tra paymentGatewayUnit
    if (isEmptyString(postData.paymentGatewayUnit)) {
        return "Payment Gateway unit không được để trống.";
    }
    // // Kiểm tra paymentMethod
    // if (isEmptyString(postData.paymentMethod)) {
    //     return "Payment method không được để trống.";
    // }
    // Kiểm tra price
    if (typeof postData.price !== 'number') {
        return "price phải là một số.";
    }
    // Kiểm tra productVariants
    if (!Array.isArray(postData.productVariants)) {
        return "productVariants phải là một mảng.";
    }
    // Kiểm tra serviceType
    if (typeof postData.serviceType !== 'number') {
        return "serviceType phải là một số.";
    }
    // Kiểm tra shippingFee
    if (typeof postData.shippingFee !== 'number') {
        return "shippingFee phải là một số.";
    }
    // Kiểm tra startAge
    if (typeof postData.startAge !== 'number') {
        return "startAge phải là một số.";
    }
    // Kiểm tra status
    if (typeof postData.status !== 'number') {
        return "status phải là một số.";
    }
    // Kiểm tra title
    if (isEmptyString(postData.title)) {
        return "title không được để trống.";
    }
    // Kiểm tra variant
    if (typeof postData.variant !== 'string') {
        return "variant phải là một chuỗi.";
    }

    return ""; // Không có lỗi
}