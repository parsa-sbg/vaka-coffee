import { useState } from "react"


export const useModal = () => {

    const [isModalShow, setIsModalShow] = useState(false)


    const hideModal = () => { setIsModalShow(false) }
    const showModal = () => { setIsModalShow(true) }


    return {
        isModalShow,
        hideModal,
        showModal
    }
}