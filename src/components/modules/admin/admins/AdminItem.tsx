import { UserInterface } from '@/models/User'
import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'
import DemoteBtn from './DemoteBtn'
import ShowBtn from './ShowBtn'

type props = {
    isOdd: boolean
    admin: UserInterface
    number: number
    setAdmins: React.Dispatch<React.SetStateAction<UserInterface[]>>
    managerRole: "ADMIN" | 'OWNER' | 'USER'
}

function AdminItem({ isOdd, number, admin, setAdmins, managerRole }: props) {
    return (
        <tr className={`${isOdd ? 'bg-secondary' : 'bg-[#0f0f0f]'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersionNumber(number.toString())}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                {admin.name}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {admin.username}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersionNumber(admin.phone)}
            </td>

            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <ShowBtn isOdd={isOdd} admin={admin} />

                    {managerRole == 'OWNER' && <DemoteBtn id={admin._id} phone={admin.phone} isOdd={isOdd} setAdmins={setAdmins} />}

                </div>
            </td>
        </tr>
    )
}

export default AdminItem