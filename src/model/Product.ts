class Product {
    id: any;
    title: string;
    description: string;
    shippingDescription:string;
    warrantyDescription:string;
    accountId: number|null; 
    categoryIds: number[]; 
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
    googleAnalytics:string;
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
        shippingDescription:string;
        warrantyDescription:string;
        accountId: number|null;   
        categoryIds: number[];  
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
        googleAnalytics:string;
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
        this.shippingDescription = parameters.shippingDescription; 
        this.warrantyDescription = parameters.warrantyDescription; 
        this.accountId = parameters.accountId;   
        this.categoryIds = parameters.categoryIds;  
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
        this.googleAnalytics = parameters.googleAnalytics;
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
        shippingDescription:"",
        warrantyDescription:"",
        accountId: null, 
        categoryIds: [],
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
        googleAnalytics:"",
        paymentGatewayUnit: "",
        paymentMethod: "",
        isPersonal: false,
        startAge: 0,
        endAge: 0,
        productVariants: []
    });
};

// export const getNewProduct = (): Product => {
//     return new Product({
//         id: null,
//         title: "namvu",
//         description: "day la dess",  
//         accountId: 1, 
//         categoryIds: [],
//         status: 1,
//         serviceType: 1,
//         variant: "",
//         price: 129,
//         comparePrice: 123,
//         costPerPrice: 232,
//         shippingFee: 323,
//         cr: 10,
//         aov: 50,
//         countryTarget: "US",
//         genderTarget: 1,
//         content: "Dep trai",
//         contentCalling: "DEP TRAI",
//         domain: "abc",
//         fullfillUnit: "OKE",
//         facebookPixel: "CONDE",
//         googleAnalytics:"OK",
//         paymentGatewayUnit: "VAI",
//         paymentMethod: "pay",
//         isPersonal: false,
//         startAge: 10,
//         endAge: 20,
//         productVariants: []
//     });
// };
