import Image from 'next/image'
import type { FC } from 'react'
import DownArrow from '../../../../public/down-arrow.svg'
import Link from 'next/link'

const Profile: FC = () => {
    return (
        <div className='text-black mr-8 hover:cursor-pointer flex justify-evenly relative group text-2xl'>
            <button>Settings</button>
            <Image src={DownArrow} alt='DownArrow' height={20} width={20} className='m-1'/>
            <div className='flex flex-col justify-around items-center absolute top-10 bg-gray-100 text-center w-40 opacity-0 group-hover:opacity-100'>
               <Link href='#' className='w-full pb-2 pt-2 hover:bg-white'>Profile</Link>
               <Link href='#' className='w-full pb-2 pt-2 hover:bg-white'>Logout</Link>
            </div>
        </div>
    )
}

export default Profile