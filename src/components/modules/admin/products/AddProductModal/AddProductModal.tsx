import { ProductInterface } from '@/models/Product'
import React, { useState } from 'react'
import NameInput from './NameInput'
import PriceInput from './PriceInput'
import PicturesSelectors from './PicturesSelector'
import CategorySelector from './CategorySelector'
import DynamicFieldsSelector from './DynamicFieldsSelector'
import CancelBtn from './CancelBtn'
import AddBtn from './AddBtn'
import { CategoryInterface } from '@/models/Category'
import mongoose from 'mongoose'
import DiscountInput from './DiscountInput'
import StockInput from './StockInput'


export type errorsType = {
    name: boolean;
    discount: boolean;
    stock: boolean;
    category: boolean;
    price: boolean;
    pictures: number[]
    dynamicFields: { section: 'key' | 'value', index: number }[];
}


type props = {
    hideModal: () => void
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
    categories: CategoryInterface[]
}

function AddProductModal({ hideModal, setProducts, categories }: props) {

    const [name, setName] = useState('')
    const [discount, setDiscount] = useState('0')
    const [stock, setStock] = useState('0')
    const [category, setCategory] = useState<mongoose.Types.ObjectId | null>(null)
    const [price, setPrice] = useState('0')
    const [pictures, setPictures] = useState<File[]>([])
    const [dynamicFields, setDynamicFields] = useState<{ id: string; key: string; value: string }[]>([{ id: crypto.randomUUID(), key: '', value: '' }]);

    const [errors, setErrors] = useState<errorsType>({
        name: false,
        discount: false,
        stock: false,
        category: false,
        price: false,
        pictures: [0],
        dynamicFields: [],
    })


    return (
        <div className=' py-20 px-10 h-full'>
            <div className='border border-l-0 bg-secondary border-main border-opacity-50 overflow-y-scroll custom-scrollbar h-full p-5 rounded-xl rounded-l-none'>
                <h3 className='font-semibold sm:text-lg'>افزودن محصول :</h3>

                <div className='mt-5 flex flex-col gap-5'>

                    <NameInput error={errors.name} setErrors={setErrors} name={name} setName={setName} />
                    <CategorySelector error={errors.category} category={setCategory} setErrors={setErrors} categories={categories} />
                    <PriceInput error={errors.price} setErrors={setErrors} price={price} setPrice={setPrice} />
                    <div className='max-w-[312px] flex gap-3'>
                        <DiscountInput discount={discount} setDiscount={setDiscount} />
                        <StockInput stock={stock} setStock={setStock} />
                    </div>
                    <PicturesSelectors errors={errors.pictures} setErrors={setErrors} setPictures={setPictures} />
                    <DynamicFieldsSelector errors={errors.dynamicFields} setErrors={setErrors} fields={dynamicFields} setFields={setDynamicFields} />

                    <div className='flex justify-between items-center gap-3'>
                        <CancelBtn hideModal={hideModal} />
                        <AddBtn setErrors={setErrors} category={category} discount={discount} dynamicFields={dynamicFields} name={name} pictures={pictures} price={price} stock={stock} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddProductModal