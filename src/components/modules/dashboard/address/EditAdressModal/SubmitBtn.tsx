import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { Address } from '@/models/User'
import { addressSchema } from '@/validation/address'
import React from 'react'
import toast from 'react-hot-toast'

type props = {
    modalAddress: Address
    setErrors: React.Dispatch<React.SetStateAction<{
        name: boolean;
        family: boolean;
        state: boolean;
        city: boolean;
        address: boolean;
        houseNumber: boolean;
    }>>
    hideModal: () => void
    setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
}

function SubmitBtn({ modalAddress, setErrors, hideModal, setAddress }: props) {


    const clickHandler = async () => {
        const parsedData = addressSchema.safeParse(modalAddress)

        if (!parsedData.success) {
            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: "top-left"
                })
                setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
            })
            return false
        }

        // fetch ...
        const res = await fetch('/api/auth/address', {
            method: "PUT",
            headers: {
                "Conetnt-Type": "application/json"
            },
            body: JSON.stringify(parsedData.data)
        })

        if (res.status == 200) {
            setAddress(parsedData.data)
            hideModal()
            toast.custom((t) => (
                <SuccessAlert t={t} title='آدرس با موفقیت آپدیت شد .' />
            ), {
                position: "top-left"
            })
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: "top-left"
            })
        }

    }

    return (
        <button onClick={clickHandler} className={`w-full mt-3 text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`} >
            ثبت
        </button>
    )
}

export default SubmitBtn