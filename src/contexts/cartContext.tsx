"use client"
import ErrorAlert from "@/components/common/alerts/ErrorAlert";
import SuccessAlert from "@/components/common/alerts/SuccessAlert";
import { CartItemInterface } from "@/models/Cart";
import toPersianNumber from "@/utils/toPersianNubmer";
import mongoose from "mongoose";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext<{
    contextCart: CartItemInterface[];
    setContextCart: Dispatch<SetStateAction<CartItemInterface[]>>
    addToCart: (productId: mongoose.Types.ObjectId, count: number, productName: string) => Promise<boolean>
    deleteFromCart: (productId: mongoose.Types.ObjectId) => Promise<boolean>
    localCart: {
        count: number;
        productId: mongoose.Types.ObjectId;
    }[]
    setLocalCart: Dispatch<SetStateAction<{
        count: number;
        productId: mongoose.Types.ObjectId;
    }[]>>
}
>(
    {
        contextCart: [],
        setContextCart: () => { },
        addToCart: async () => true,
        localCart: [],
        setLocalCart: () => { },
        deleteFromCart: async () => true
    }
)


export const CartContextProvider = ({ children }: PropsWithChildren) => {


    const [contextCart, setContextCart] = useState<CartItemInterface[]>([])
    const [localCart, setLocalCart] = useState<{ count: number, productId: mongoose.Types.ObjectId }[]>([])


    const addToCart = async (productId: mongoose.Types.ObjectId, count: number, productName: string) => {


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

            const result = localCart.find(item => item.productId == productId)
            if (result) {
                if (+data.foundProduct.stock < count + +result.count) {
                    toast.custom((t) => (
                        <ErrorAlert t={t} title='تعداد درخواستی از موجودی محصول بیشتر است .' />
                    ), {
                        position: 'top-left'
                    })
                    return false
                }
                setLocalCart(prev => prev.map(item => {
                    if (item.productId == productId) {
                        return { ...item, count: item.count + count }
                    }
                    return item
                }))
            } else {
                setLocalCart(prev => [...prev, { count, productId }])
            }

            toast.custom((t) => (
                <SuccessAlert t={t} title={toPersianNumber(`${count} عدد از محصول ${productName} به سبد شما اضافه شد.`)} />
            ), {
                position: 'top-left'
            })

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

    const deleteFromCart = async (productId: mongoose.Types.ObjectId) => {
        const res = await fetch('/api/cart/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId
            })
        })
        const data = await res.json()

        if (res.status == 401) {

            setLocalCart(prev => prev.filter(item => item.productId !== productId))

        } else if (res.status == 200) {
            setContextCart(data.newCart.cart as CartItemInterface[])
            return true
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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(localCart))
    }, [localCart])

    return (

        <cartContext.Provider value={{ contextCart, setContextCart, addToCart, localCart, setLocalCart, deleteFromCart }}>
            {children}
        </cartContext.Provider>
    )
}

export const useContextCart = () => { return useContext(cartContext) }