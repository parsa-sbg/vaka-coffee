"use client"
import { getManyProductsById } from "@/actions/products";
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
    addToCart: (product: mongoose.Types.ObjectId, count: number, productName: string) => Promise<boolean>
    deleteFromCart: (product: mongoose.Types.ObjectId) => Promise<boolean>
    localCart: {
        count: number;
        product: mongoose.Types.ObjectId;
    }[]
    setLocalCart: Dispatch<SetStateAction<{
        count: number;
        product: mongoose.Types.ObjectId;
    }[]>>
    changeItemCount: (productId: mongoose.Types.ObjectId, newCount: number) => Promise<void>
}
>(
    {
        contextCart: [],
        setContextCart: () => { },
        addToCart: async () => true,
        localCart: [],
        setLocalCart: () => { },
        deleteFromCart: async () => true,
        changeItemCount: async () => { }
    }
)


export const CartContextProvider = ({ children }: PropsWithChildren) => {


    const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]')

    const [contextCart, setContextCart] = useState<CartItemInterface[]>([])
    const [localCart, setLocalCart] = useState<{ count: number, product: mongoose.Types.ObjectId }[]>(localStorageCart)
    const [isFirstRender, setIsFirstRender] = useState(true)


    const addToCart = async (product: mongoose.Types.ObjectId, count: number, productName: string) => {


        const res = await fetch('/api/cart/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product,
                count
            })
        })
        const data = await res.json()


        if (res.status == 401) {

            const result = localCart.find(item => item.product == product)
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
                    if (item.product == product) {
                        return { ...item, count: item.count + count }
                    }
                    return item
                }))
            } else {
                setLocalCart(prev => [...prev, { count, product }])
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

    const deleteFromCart = async (product: mongoose.Types.ObjectId) => {
        const res = await fetch('/api/cart/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product
            })
        })
        const data = await res.json()

        if (res.status == 401) {

            setLocalCart(prev => prev.filter(item => item.product !== product))

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

    const changeItemCount = async (productId: mongoose.Types.ObjectId, newCount: number) => {


        const res = await fetch('/api/cart/changecount', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product: productId,
                newCount
            })
        })

        const data = await res.json()

        switch (res.status) {
            case 200: {
                setContextCart(data.newCart.cart)
                break
            }


            case 401: {
                // change in local cart
                setLocalCart(prev => prev.map(item => {
                    if (item.product == productId) {
                        return { ...item, count: newCount }
                    } else {
                        return item
                    }
                }))
                break
            }


            case 409: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title="مقدار درخواستی از موجودی محصول بیشتر است ." />
                ), {
                    position: "top-left"
                })
                break
            }


            default: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title="خطایی رخ داد !" />
                ), {
                    position: "top-left"
                })
                break
            }


        }


    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(localCart))
    }, [localCart])

    useEffect(() => {
        if (!isFirstRender) {
            getManyProductsById(localCart.map(item => item.product.toString()))
                .then(products => {
                    const newCart = products.map((product, index) => {
                        return { count: localCart[index].count, product }
                    })
                    setContextCart(newCart)
                })
        } else {
            setIsFirstRender(false)
        }
    }, [localCart])

    return (

        <cartContext.Provider value={{ contextCart, setContextCart, addToCart, localCart, setLocalCart, deleteFromCart, changeItemCount }}>
            {children}
        </cartContext.Provider>
    )
}

export const useContextCart = () => { return useContext(cartContext) }