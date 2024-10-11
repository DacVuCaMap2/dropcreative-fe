class Product {
    id: any;
    title: string;
    description: string;
    accountId: number; 
    categoryId: number; 
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
    paymentGatewayUnit: string; 
    paymentMethod: string; 
    isPersonal: boolean; 
    startAge: number; 
    endAge: number;
    productVariants: ProductVariant[]; 

    constructor(parameters: {
        id: any;
        title: string;
        description: string; 
        accountId: number;   
        categoryId: number;  
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
        paymentGatewayUnit: string; 
        paymentMethod: string; 
        isPersonal: boolean;   
        startAge: number;      
        endAge: number;        
        productVariants: ProductVariant[];
    }) {
        this.id = parameters.id;
        this.title = parameters.title;
        this.description = parameters.description; 
        this.accountId = parameters.accountId;   
        this.categoryId = parameters.categoryId;  
        this.status = parameters.status;
        this.serviceType = parameters.serviceType;  
        this.variant = parameters.variant;
        this.price = parameters.price;
        this.comparePrice = parameters.comparePrice;
        this.costPerPrice = parameters.costPerPrice;
        this.shippingFee = parameters.shippingFee;
        this.cr = parameters.cr;
        this.aov = parameters.aov;
        this.countryTarget = parameters.countryTarget;
        this.genderTarget = parameters.genderTarget;  
        this.content = parameters.content;
        this.contentCalling = parameters.contentCalling; 
        this.domain = parameters.domain;
        this.fullfillUnit = parameters.fullfillUnit;   
        this.facebookPixel = parameters.facebookPixel;
        this.paymentGatewayUnit = parameters.paymentGatewayUnit; 
        this.paymentMethod = parameters.paymentMethod; 
        this.isPersonal = parameters.isPersonal;   
        this.startAge = parameters.startAge;      
        this.endAge = parameters.endAge;        
        this.productVariants = parameters.productVariants;
    }
}


export default Product;

export const getNewProduct = (): Product => {
    return new Product({
        id: null,
        title: "",
        description: "",  
        accountId: 0, 
        categoryId: 0,
        status: 0,
        serviceType: 0,
        variant: "",
        price: 0,
        comparePrice: 0,
        costPerPrice: 0,
        shippingFee: 0,
        cr: 0,
        aov: 0,
        countryTarget: "",
        genderTarget: 0,
        content: "",
        contentCalling: "",
        domain: "",
        fullfillUnit: "",
        facebookPixel: "",
        paymentGatewayUnit: "",
        paymentMethod: "",
        isPersonal: false,
        startAge: 0,
        endAge: 0,
        productVariants: []
    });
};
