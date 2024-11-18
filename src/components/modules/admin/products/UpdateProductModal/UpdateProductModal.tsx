import { ProductInterface } from '@/models/Product'
import React, { useEffect, useState } from 'react'
import NameInput from '../AddProductModal/NameInput'
import PriceInput from '../AddProductModal/PriceInput'
import PicturesSelectors from '../AddProductModal/PicturesSelector'
import DynamicFieldsSelector from '../AddProductModal/DynamicFieldsSelector'
import CancelBtn from '../AddProductModal/CancelBtn'
import { CategoryInterface } from '@/models/Category'
import mongoose from 'mongoose'
import DiscountInput from '../AddProductModal/DiscountInput'
import StockInput from '../AddProductModal/StockInput'
import UpdateBtn from './UpdateBtn'
import UpdateModalCategorySelector from './UpdateModalCategorySelector'
import UpdateProductModalPicturesSelector from './UpdateProductModalPicturesSelector'


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
    product: ProductInterface
}

function UpdateProductModal({ hideModal, setProducts, categories, product }: props) {
    console.log(product);


    const [name, setName] = useState(product.name)
    const [discount, setDiscount] = useState<string>(product.discount.toString())
    const [stock, setStock] = useState<string>(product.stock.toString())
    const [category, setCategory] = useState<mongoose.Types.ObjectId | null>(product.category._id)
    const [price, setPrice] = useState<string>(product.price.toString())
    const [pictures, setPictures] = useState<File[]>([])
    const [dynamicFields, setDynamicFields] = useState<{ id: string; key: string; value: string }[]>(product.dynamicFields.map(item => ({ ...item, id: crypto.randomUUID() })));
    
    const [uploadNewPictures, setUploadNewPictures] = useState(true);
    
    const [errors, setErrors] = useState<errorsType>({
        name: false,
        discount: false,
        stock: false,
        category: false,
        price: false,
        pictures: [0],
        dynamicFields: [],
    })

    useEffect(() => {
        setName(product.name)
        setDiscount(product.discount.toString())
        setStock(product.stock.toString())
        setCategory(product.category._id)
        setPrice(product.price.toString())
        setDynamicFields(product.dynamicFields.map(item => ({ ...item, id: crypto.randomUUID() })))
        setUploadNewPictures(false)

        setErrors({
            name: false,
            discount: false,
            stock: false,
            category: false,
            price: false,
            pictures: [0],
            dynamicFields: [],
        })
    }, [product])

    const resetDatas = () => {
        setName('')
        setDiscount('0')
        setStock('0')
        setCategory(null)
        setPrice('0')
        setPictures([])
        setDynamicFields([{ id: crypto.randomUUID(), key: '', value: '' }])
    }

    return (
        <div className=' py-20 px-10 h-full'>
            <div className='border border-l-0 bg-secondary border-main border-opacity-50 overflow-y-scroll custom-scrollbar h-full p-5 rounded-xl rounded-l-none'>
                <h3 className='font-semibold sm:text-lg'>ویرایش محصول :</h3>

                <div className='mt-5 flex flex-col gap-5'>
                    <NameInput error={errors.name} setErrors={setErrors} name={name} setName={setName} />
                    {/* <CategorySelector category={category} error={errors.category} setCategory={setCategory} setErrors={setErrors} categories={categories} /> */}
                    <UpdateModalCategorySelector selectedcatName={product.category.name} category={category} error={errors.category} setCategory={setCategory} setErrors={setErrors} categories={categories} />

                    <PriceInput error={errors.price} setErrors={setErrors} price={price} setPrice={setPrice} />
                    <div className='max-w-[312px] flex gap-3'>
                        <DiscountInput discount={discount} setDiscount={setDiscount} />
                        <StockInput stock={stock} setStock={setStock} />
                    </div>
                    {/* <PicturesSelectors pictures={pictures} errors={errors.pictures} setErrors={setErrors} setPictures={setPictures} /> */}
                    <UpdateProductModalPicturesSelector oldImages={product.pictures} setUploadNewPictures={setUploadNewPictures} uploadNewPictures={uploadNewPictures} pictures={pictures} errors={errors.pictures} setErrors={setErrors} setPictures={setPictures} />
                    <DynamicFieldsSelector errors={errors.dynamicFields} setErrors={setErrors} fields={dynamicFields} setFields={setDynamicFields} />

                    <div className='flex justify-between items-center gap-3'>
                        <CancelBtn hideModal={hideModal} />
                        <UpdateBtn productId={product._id.toString()} uploadNewPictures={uploadNewPictures} setProducts={setProducts} resetDatas={resetDatas} hideModal={hideModal} setErrors={setErrors} category={category} discount={discount} dynamicFields={dynamicFields} name={name} pictures={pictures} price={price} stock={stock} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateProductModal