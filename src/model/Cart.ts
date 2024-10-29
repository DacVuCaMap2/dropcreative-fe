import CartItem from "./CartItem";
export type ComboSale = {
    key1: any,
    key2: any
}
class Cart {
    id: any;
    cartItems: CartItem[];
    productId: any;
    shippingFee:any;
    comboSale: ComboSale[];
    bougthTogether:CartItem[];
    constructor(id: any, cartItems: CartItem[], productId: any, comboSale: ComboSale[],bougthTogether:CartItem[]) {
        this.id = id;
        this.cartItems = cartItems;
        this.productId = productId;
        this.comboSale = comboSale;
        this.bougthTogether = bougthTogether;
    }
}
export default Cart;

export const getNewCart = (productId:any,comboSale:ComboSale[],shippingFee?:any) : Cart =>{
    const shipFee = shippingFee ? 4.99 : shippingFee;
    return {
        id:-1,
        cartItems:[],
        productId:productId,
        comboSale:comboSale,
        bougthTogether:[],
        shippingFee:shipFee
    }
} 