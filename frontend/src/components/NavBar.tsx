import type { UserContext } from '@/types'
import Link from 'next/link'
import type { FC } from 'react'
import Settings from './Settings'
import { Cloud } from './images/Cloud'

const NavBar: FC<{ user: UserContext }> = ({ user }) => {
    return (
        <div className='flex justify-between items-center h-[7%] bg-gradient-to-r from-gray-100 to-gray-300'>
            <Link href='/home' className='text-black text-3xl ml-8'>
                <span>{Cloud}</span>
                <span>BlogCloud</span>
            </Link>
            <span className='text-3xl text-blue-900'>
                Welcome, {user.firstName}
            </span>
            <Settings />
        </div>
    )
}

export default NavBar