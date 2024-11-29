"use client"
import ErrorAlert from "@/components/common/alerts/ErrorAlert";
import SuccessAlert from "@/components/common/alerts/SuccessAlert";
import { CartInterface, CartItemInterface } from "@/models/Cart";
import toPersianNumber from "@/utils/toPersianNubmer";
import mongoose from "mongoose";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext<{
    contextCart: CartItemInterface[];
    setContextCart: Dispatch<SetStateAction<CartItemInterface[]>>
    addToCart: (productId: mongoose.Types.ObjectId, count: number, productName: string) => Promise<boolean>
}
>(
    {
        contextCart: [],
        setContextCart: () => { },
        addToCart: async () => true
    }
)


export const CartContextProvider = ({ children }: PropsWithChildren) => {


    const [contextCart, setContextCart] = useState<CartItemInterface[]>([])


    const addToCart = async (productId: mongoose.Types.ObjectId, count: number, productName: string) => {
        console.log('productId ==>>', productId);
        console.log('count ==>>', count);

        const res = await fetch('/api/cart/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId,
                count
            })
        })
        const data = await res.json()


        if (res.status == 401) {

            // add product to local storage cart
            // ...
            // ...
            // ...

        } else if (res.status == 200) {
            setContextCart(data.newCart.cart as CartItemInterface[])
            toast.custom((t) => (
                <SuccessAlert t={t} title={toPersianNumber(`${count} عدد از محصول ${productName} به سبد شما اضافه شد.`)} />
            ), {
                position: 'top-left'
            })
            return true
        } else if (res.status == 409) {
            toast.custom((t) => (
                <ErrorAlert t={t} title='تعداد درخواستی از موجودی محصول بیشتر است .' />
            ), {
                position: 'top-left'
            })
            return false
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
            return false
        }

        return false


    }

    return (

        <cartContext.Provider value={{ contextCart, setContextCart, addToCart }}>
            {children}
        </cartContext.Provider>
    )
}

export const useContextCart = () => { return useContext(cartContext) }