class CartItem {
    id: any;
    quantity: any;
    name: string;
    variants : string;
    productId: any;
    price: number;
    imageUrl:string;
    comparePrice:number;
    constructor(id: any, quantity: any, name: string, productId: any, price: number,variants:string,imageUrl:string,comparePrice:number) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.productId = productId;
        this.price = price;
        this.variants = variants;
        this.imageUrl=imageUrl;
        this.comparePrice=comparePrice;
    }
}
export default CartItem;

export const getNewCartItem=( id:any,quantity: any, name: string, productId: any, price: number,variants:string,imageUrl:string,comparePrice:number) : CartItem=>{
    return {
        id:id,
        quantity:quantity,
        name:name,
        productId:productId,
        price:price,
        variants:variants,
        imageUrl:imageUrl,
        comparePrice:comparePrice
    }
}
