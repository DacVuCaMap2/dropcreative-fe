class Product {
    id: any;
    title: string;
    status: any;
    variant: string;
    price: number;
    comparePrice: number;
    costPerPrice: number;
    shippingFee: number;
    updateAt: Date;
    createAt: Date;
    cr: number;
    aov: number;
    countryTarget: string;
    content: string;
    domain: string;
    paymentGateWayUnit: string;
    fullFillUnit: string;
    image: string[];
    video: string[];
    facebookPixel: string;

    constructor(parameters: {
        id: any;
        title: string;
        status: any;
        variant: string;
        price: number;
        comparePrice: number;
        costPerPrice: number;
        shippingFee: number;
        updateAt: Date;
        createAt: Date;
        cr: number;
        aov: number;
        countryTarget: string;
        content: string;
        domain: string;
        paymentGateWayUnit: string;
        fullFillUnit: string;
        image: string[];
        video: string[];
        facebookPixel: string;
    }) {
        this.id = parameters.id;
        this.title = parameters.title;
        this.status = parameters.status;
        this.variant = parameters.variant;
        this.price = parameters.price;
        this.comparePrice = parameters.comparePrice;
        this.costPerPrice = parameters.costPerPrice;
        this.shippingFee = parameters.shippingFee;
        this.updateAt = parameters.updateAt;
        this.createAt = parameters.createAt;
        this.cr = parameters.cr;
        this.aov = parameters.aov;
        this.countryTarget = parameters.countryTarget;
        this.content = parameters.content;
        this.domain = parameters.domain;
        this.paymentGateWayUnit = parameters.paymentGateWayUnit;
        this.fullFillUnit = parameters.fullFillUnit;
        this.image = parameters.image;
        this.video = parameters.video;
        this.facebookPixel = parameters.facebookPixel;
    }
}

export default Product;

export const getNewProduct = (): Product => {
    return new Product({
        id: null,
        title: "",
        status: "",
        variant: "",
        price: 0,
        comparePrice: 0,
        costPerPrice: 0,
        shippingFee: 0,
        updateAt: new Date(),
        createAt: new Date(),
        cr: 0,
        aov: 0,
        countryTarget: "",
        content: "",
        domain: "",
        paymentGateWayUnit: "",
        fullFillUnit: "",
        image: [],
        video: [],
        facebookPixel: "",
    });
};
