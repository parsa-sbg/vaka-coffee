import { UserInterface } from '@/models/User'
import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'
import PromoteBtn from './PeomoteBtn'
import DeleteBtn from './DeleteBtn'
import ShowBtn from './ShowBtn'

type props = {
    isOdd: boolean
    user: UserInterface
    number: number
    setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>
}

function UserItem({ isOdd, user, number, setUsers }: props) {


    return (
        <tr className={`${isOdd ? 'bg-secondary' : 'bg-[#0f0f0f]'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersionNumber(number.toString())}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                {user.name}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {user.username}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersionNumber(user.phone)}
            </td>

            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <ShowBtn user={user} isOdd={isOdd} />

                    <PromoteBtn setUsers={setUsers} isOdd={isOdd} phone={user.phone} id={user._id} />

                    <DeleteBtn id={user._id} isOdd={isOdd} phone={user.phone} setUsers={setUsers} />

                </div>
            </td>
        </tr>
    )
}

export default UserItem