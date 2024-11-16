import { ProductInterface } from '@/models/Product'
import React from 'react'
import NameInput from './NameInput'
import PriceInput from './PriceInput'
import PicturesSelectors from './PicturesSelector'
import CategorySelector from './CategorySelector'
import DynamicFieldsSelector from './DynamicFieldsSelector'
import CancelBtn from './CancelBtn'
import AddBtn from './AddBtn'
import { CategoryInterface } from '@/models/Category'

type props = {
    hideModal: () => void
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
    categories: CategoryInterface[]
}

function AddProductModal({ hideModal, setProducts, categories }: props) {
    return (
        <div className=' py-20 px-10 h-full'>
            <div className='border border-l-0 bg-secondary border-main border-opacity-50 overflow-y-scroll custom-scrollbar h-full p-5 rounded-xl rounded-l-none'>
                <h3 className='font-semibold sm:text-lg'>افزودن محصول :</h3>

                <div className='mt-5 flex flex-col gap-5'>

                    <NameInput />
                    <CategorySelector categories={categories} />
                    <PriceInput />
                    <PicturesSelectors />
                    <DynamicFieldsSelector />

                    <div className='flex justify-between items-center gap-3'>
                        <CancelBtn hideModal={hideModal} />
                        <AddBtn />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddProductModal