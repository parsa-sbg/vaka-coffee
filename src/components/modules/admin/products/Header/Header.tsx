import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import Categories from './Categories';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import AddProductModal from '../AddProductModal/AddProductModal';
import { ProductInterface } from '@/models/Product';


type props = {
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
}

function Header({ setProducts }: props) {

    const { isModalShow, showModal, hideModal } = useModal()

    return (
        <div className='mb-5 flex justify-between items-center'>

            <button onClick={showModal} className='flex w-fit text-nowrap items-center gap-2 bg-main text-bgColer px-2 md:px-4 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>
                <IoMdAddCircleOutline size={25} />
                افزودن محصول
            </button>

            <Categories />

            <Modal coverClickhandler={hideModal} isModalShow={isModalShow} >
                <AddProductModal setProducts={setProducts} hideModal={hideModal} />
            </Modal>

        </div>
    )
}

export default Header