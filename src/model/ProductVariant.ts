class ProductVariant {
    value: string;
    status: number;
    price: number;
    comparePrice: number;
    quantity: number;
    sku: string;
    barcode: string;
    fileName: string;

    constructor(parameters: {
        value: string;
        status: number;
        price: number;
        comparePrice: number;
        quantity: number;
        sku: string;
        barcode: string;
        fileName: string;
    }) {
        this.value = parameters.value;
        this.status = parameters.status;
        this.price = parameters.price;
        this.comparePrice = parameters.comparePrice;
        this.quantity = parameters.quantity;
        this.sku = parameters.sku;
        this.barcode = parameters.barcode;
        this.fileName = parameters.fileName;
    }
}