interface ProductVariant {
    value: string;
    status: number;
    price: number;
    comparePrice: number;
    quantity: number;
    sku: string;
    barcode: string;
    fileName: string;
    id?: number; // ID có thể không bắt buộc
  }
  
  interface Product {
    title: string;
    description: string;
    accountId: number;
    status: number;
    serviceType: number;
    variant: string;
    price: number;
    comparePrice: number;
    costPerPrice: number;
    shippingFee: number;
    cr: number;
    aov: number;
    countryTarget: string;
    genderTarget: number;
    content: string;
    contentCalling: string;
    domain: string;
    fullfillUnit: string;
    facebookPixel: string;
    googleAnalytics: string;
    paymentGatewayUnit: string;
    paymentMethod: string;
    isPersonal: boolean;
    startAge: number;
    endAge: number;
    comboSale: string;
    boughtTogether: string;
    shippingDescription: string;
    warrantyDescription: string;
    productVariants: ProductVariant[];
    categoryIds: number[];
    holiday: number[];
    season: number[];
    imageIds: any[]; // Có thể thay thế bằng kiểu dữ liệu cụ thể hơn
    videoIds: any[]; // Có thể thay thế bằng kiểu dữ liệu cụ thể hơn
  }
  
  class PostProduct implements Product {
    title: string;
    description: string;
    accountId: number;
    status: number;
    serviceType: number;
    variant: string;
    price: number;
    comparePrice: number;
    costPerPrice: number;
    shippingFee: number;
    cr: number;
    aov: number;
    countryTarget: string;
    genderTarget: number;
    content: string;
    contentCalling: string;
    domain: string;
    fullfillUnit: string;
    facebookPixel: string;
    googleAnalytics: string;
    paymentGatewayUnit: string;
    paymentMethod: string;
    isPersonal: boolean;
    startAge: number;
    endAge: number;
    comboSale: string;
    boughtTogether: string;
    shippingDescription: string;
    warrantyDescription: string;
    productVariants: ProductVariant[];
    categoryIds: number[];
    holiday: number[];
    season: number[];
    imageIds: any[];
    videoIds: any[];
  
    constructor(data: Product) {
      this.title = data.title;
      this.description = data.description;
      this.accountId = data.accountId;
      this.status = data.status;
      this.serviceType = data.serviceType;
      this.variant = data.variant;
      this.price = data.price;
      this.comparePrice = data.comparePrice;
      this.costPerPrice = data.costPerPrice;
      this.shippingFee = data.shippingFee;
      this.cr = data.cr;
      this.aov = data.aov;
      this.countryTarget = data.countryTarget;
      this.genderTarget = data.genderTarget;
      this.content = data.content;
      this.contentCalling = data.contentCalling;
      this.domain = data.domain;
      this.fullfillUnit = data.fullfillUnit;
      this.facebookPixel = data.facebookPixel;
      this.googleAnalytics = data.googleAnalytics;
      this.paymentGatewayUnit = data.paymentGatewayUnit;
      this.paymentMethod = data.paymentMethod;
      this.isPersonal = data.isPersonal;
      this.startAge = data.startAge;
      this.endAge = data.endAge;
      this.comboSale = data.comboSale;
      this.boughtTogether = data.boughtTogether;
      this.shippingDescription = data.shippingDescription;
      this.warrantyDescription = data.warrantyDescription;
      this.productVariants = data.productVariants;
      this.categoryIds = data.categoryIds;
      this.holiday = data.holiday;
      this.season = data.season;
      this.imageIds = data.imageIds;
      this.videoIds = data.videoIds;
    }
  }
  
  export default PostProduct;
  