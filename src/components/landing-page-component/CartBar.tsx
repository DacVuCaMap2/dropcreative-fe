"use client"
import Cart from '@/model/Cart'
import CartItem from '@/model/CartItem';
import { BadgeDollarSign, ChevronLeft, CirclePercent, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
type Props = {
    currentListCart: Cart[],
    setOpenCart: any,
    setCurrentListCart: React.Dispatch<React.SetStateAction<Cart[]>>,
    isOpen:boolean
}
type Total = { subtotal: number, shippingFee: number, sale: number, total: number }
export default function CartBar(props: Props) {
    const currentListCart = props.currentListCart;
    let selectSale : any=null;
    const handleTotal = (): Total => {
        if (currentListCart.length > 0) {
            const shippingFee = currentListCart[0].shippingFee;
            const subTotal = currentListCart.reduce((parentTot: number, cart: Cart) => {
                return (cart.cartItems.reduce((childTot: number, cartItem: CartItem) => { return cartItem.quantity * cartItem.price + childTot }, 0)) + parentTot
            }, 0)
            let countProduct = currentListCart[0].cartItems.reduce((tot:number,cartItem:CartItem)=>{
                return cartItem.quantity+tot;
            },0);
            if (currentListCart[0].bougthTogether.length>0) {
                countProduct++;
            }
            let sale = 0;
            if (currentListCart[0].comboSale.length>0) {
                currentListCart[0].comboSale.forEach((item=>{
                    if (parseFloat(item.key1)<countProduct) {
                        sale = parseFloat(item.key2);
                        selectSale=item;
                    }
                }))
            }
            sale = (subTotal+shippingFee)*sale/100
            const tot: Total = { subtotal: subTotal, shippingFee: shippingFee, sale: sale, total: subTotal+shippingFee-sale };
            return tot;
        }
        else {
            return { subtotal: 0, shippingFee: 0, sale: 0, total: 0 };
        }

    }
    const total: Total = handleTotal();
    const handleChangeQuantity = (isAdd: boolean, index: number, childIndex: number, isItem: boolean) => {
        if (isItem) {
            const currentCart: Cart = currentListCart[index];
            const currentCartItem: CartItem = currentCart.cartItems[childIndex];
            let quantity = isAdd ? currentCartItem.quantity + 1 : currentCartItem.quantity - 1;
            quantity = quantity == 0 ? 1 : quantity;
            const newListCart = currentListCart.map((cart: Cart, parentIndex) => {
                if (index === parentIndex) {
                    const cartItems = cart.cartItems.map((cartItem: CartItem, cartItemIndex) => {
                        if (cartItemIndex === childIndex) {
                            return { ...cartItem, quantity: quantity }
                        }
                        return cartItem;
                    })
                    return { ...cart, cartItems: cartItems }
                }
                return cart;
            })
            props.setCurrentListCart(newListCart);
        }
    }
    const removeCartItem = (index: number, childIndex: number, isItem: boolean) =>{
        const temp : CartItem[] = currentListCart[index].cartItems.filter((cartItem:CartItem,cartItemIndex)=>childIndex!=cartItemIndex);
        const newListCart = currentListCart.map((cart:Cart,cartIndex)=>{
            if (cartIndex===index) {
                return {...cart,cartItems:temp};
            }
            return cart;
        })
        props.setCurrentListCart(newListCart);
    }
    return (
        <div onClick={e=>e.stopPropagation()}  className={`lg:w-[500px] w-full fixed top-0 right-0 h-screen  bg-white z-30 flex flex-col px-4 transition-transform transform ${props.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex flex-row items-center justify-between border-b border-neutral-400 py-2 '>
                <div className=' text-gray-500 relative pl-2'>
                    <div className='top-[-10px] right-[-10px] rounded-full w-5 h-5 text-[10px] flex justify-center items-center absolute bg-black text-white'>10</div>
                    <ShoppingCart />
                </div>
                <div className='flex flex-row space-x-2 px-4 text-2xl'>
                    Your Cart
                </div>
                <button onClick={() => props.setOpenCart(false)} className='hover:bg-gray-200 p-2 rounded'>
                    <X />
                </button>
            </div>
            <div className='flex-grow border-b border-neutral-400 overflow-auto flex flex-col '>
                {currentListCart.map((cart: Cart, index) => (
                    <div key={index}>
                        {cart.cartItems.map((cartItem: CartItem, childIndex) => (
                            <div key={childIndex} className='relative border-t flex flex-row py-4 space-x-4'>
                                <div className='w-[120px] h-[120px] overflow-hidden flex justify-center items-center '>
                                    <Image
                                        src={`${cartItem.imageUrl ? process.env.NEXT_PUBLIC_API_URL + cartItem.imageUrl : "/image/noPhotos.png"}`}
                                        alt="img"
                                        className='h-[120px] w-auto object-contain '
                                        width={600}
                                        height={600}
                                        priority
                                    />
                                </div>
                                <div className=' flex flex-col w-[320px] '>

                                    <div className='flex flex-row'>
                                        <div className='font-bold text-sm mb-2 w-[300px] h-10 overflow-hidden'><p>{cartItem.name} </p> </div>
                                        <button onClick={()=>removeCartItem(index,childIndex,true)} className='absolute top-0 right-0 text-gray-500 hover:text-black p-2 rounded'>
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <p className='text-xs text-gray-400 mb-4'>{cartItem.variants}</p>
                                    <div className='flex flex-row justify-between items-center'>
                                        <div className='flex flex-row w-24 border border-neutral-300 h-10 items-center'>
                                            <button onClick={() => handleChangeQuantity(false, index, childIndex, true)} className='w-1/3 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Minus /></button>
                                            <span className='w-full text-center text-xs'>{cartItem.quantity}</span>

                                            <button onClick={() => handleChangeQuantity(true, index, childIndex, true)} className='w-1/3 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Plus /></button>
                                        </div>
                                        <div className='space-x-2'>
                                            <span className='line-through text-gray-400'>{cartItem.comparePrice}</span>
                                            <span className='font-bold text-xl'>${cartItem.price}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                ))}

            </div>
            <div className='flex flex-col pb-4'>
                <div className='flex flex-row py-1 justify-center items-center'>
                    <div className='flex-grow text'>Subtotal</div>
                    <div className='w-[100px] text-right'>{total.subtotal.toFixed(2)}$</div>
                </div>
                <div className='flex flex-row py-1 justify-center items-center'>
                    <div className='flex-grow text'>Shipping fee</div>
                    <div className='w-[100px] text-right'>{total.shippingFee.toFixed(2)}$</div>
                </div>
                <div className='flex flex-row py-1'>
                    <div className='flex-grow text flex flex-row items-center'>
                        <span className='mr-4'>Sale</span>
                        {selectSale && <BadgeDollarSign size={16} className='text-neutral-400 mr-1' />}
                        {selectSale && <span className='text-xs text-neutral-400'>Buy {selectSale.key1} item sale {selectSale.key2}%</span>}
                    </div>
                    <div className='w-[100px] text-right'>- {total.sale.toFixed(2)}$</div>
                </div>
                <div className='flex flex-row py-2 justify-center items-center font-bold'>
                    <div className='flex-grow text'>TOTAL</div>
                    <div className='w-[100px] text-right'>{total.total.toFixed(2)}$</div>
                </div>
                <button className='bg-black text-white py-2 mt-4 hover:bg-neutral-700 transition-transform duration-300'>
                    Checkout
                </button>
            </div>
        </div>
    )
}
