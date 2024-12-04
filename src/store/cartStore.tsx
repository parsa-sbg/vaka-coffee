import { getManyProductsById } from '@/actions/products';
import ErrorAlert from '@/components/common/alerts/ErrorAlert';
import SuccessAlert from '@/components/common/alerts/SuccessAlert';
import { CartItemInterface } from '@/models/Cart';
import toPersianNumber from '@/utils/toPersianNubmer';
import mongoose from 'mongoose';
import toast from 'react-hot-toast';
import { create } from 'zustand'

type state = {
    cart: CartItemInterface[];
    localCart: {
        count: number;
        product: mongoose.Types.ObjectId;
    }[]
}

type action = {
    setCart: (newCart: CartItemInterface[]) => void
    setLocalCart: (newLocalCart: { count: number; product: mongoose.Types.ObjectId; }[]) => void
    addToCart: (product: mongoose.Types.ObjectId, count: number, productName: string) => Promise<boolean>
    deleteFromCart: (product: mongoose.Types.ObjectId) => Promise<boolean>
    changeItemCount: (productId: mongoose.Types.ObjectId, newCount: number) => Promise<boolean>
    syncCartWithLocalCart: () => Promise<void>
}

export const useCartStore = create<state & action>()((set, get) => ({

    cart: [],

    localCart: JSON.parse(localStorage.getItem('cart') || '[]'),

    setCart: (newCart) => {
        set({ cart: newCart })
    },

    setLocalCart: (newLocalCart) => { set({ localCart: newLocalCart }) },

    addToCart: async (product, count, productName) => {

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

        const statusCode = res.status

        switch (statusCode) {

            case 401: {
                // add to local cart
                const result = get().localCart.find(item => item.product == product)
                if (result) {
                    if (+data.foundProduct.stock < count + +result.count) {
                        toast.custom((t) => (
                            <ErrorAlert t={t} title='تعداد درخواستی از موجودی محصول بیشتر است .' />
                        ), {
                            position: 'top-left'
                        })
                        return false
                    }
                    set(state => ({
                        localCart: state.localCart.map(item => {
                            if (item.product == product) {
                                return { ...item, count: item.count + count }
                            }
                            return item
                        })
                    }))
                } else {
                    set(state => ({
                        localCart: [...state.localCart, { count, product }]
                    }))
                }

                get().syncCartWithLocalCart()

                toast.custom((t) => (
                    <SuccessAlert t={t} title={toPersianNumber(`${count} عدد از محصول ${productName} به سبد شما اضافه شد.`)} />
                ), {
                    position: 'top-left'
                })
                return true
            }

            case 200: {
                set({ cart: data.newCart.cart })
                toast.custom((t) => (
                    <SuccessAlert t={t} title={toPersianNumber(`${count} عدد از محصول ${productName} به سبد شما اضافه شد.`)} />
                ), {
                    position: 'top-left'
                })
                return true
            }

            case 409: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title='تعداد درخواستی از موجودی محصول بیشتر است .' />
                ), {
                    position: 'top-left'
                })
                return false
            }

            default: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title='خطایی رخ داد !' />
                ), {
                    position: 'top-left'
                })
                return false
            }

        }


    },

    deleteFromCart: async (product) => {
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

        const statusCode = res.status

        switch (statusCode) {
            case 401: {
                // delete from local cart
                set(state => ({ localCart: state.localCart.filter(item => item.product !== product) }))
                get().syncCartWithLocalCart()
                return true
            }
            case 200: {
                set({ cart: data.newCart.cart })
                return true
            }
            default: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title='خطایی رخ داد !' />
                ), {
                    position: 'top-left'
                })
                return false
            }
        }
    },

    changeItemCount: async (productId, newCount) => {
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

        const statusCode = res.status

        switch (statusCode) {
            case 401: {
                // cahnge from local cart
                set(state => ({
                    localCart: state.localCart.map(item => {
                        if (item.product == productId) {
                            return { ...item, count: newCount }
                        } else {
                            return item
                        }
                    })
                }))
                get().syncCartWithLocalCart()
                return true
            }
            case 200: {
                set({ cart: data.newCart.cart })
                return true
            }

            case 409: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title="مقدار درخواستی از موجودی محصول بیشتر است ." />
                ), {
                    position: "top-left"
                })
                return false
            }

            default: {
                toast.custom((t) => (
                    <ErrorAlert t={t} title="خطایی رخ داد !" />
                ), {
                    position: "top-left"
                })
                return false
            }
        }

    },

    syncCartWithLocalCart: async () => {
        localStorage.setItem('cart', JSON.stringify(get().localCart))
        const products = await getManyProductsById(get().localCart.map(item => item.product.toString()))

        const newCart = products.map((product, index) => {
            return { count: get().localCart[index].count, product }
        })
        set({ cart: newCart })

    }

}))