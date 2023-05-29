import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DownArrowImage from '../../../../public/down-arrow.svg'
import AccountImage from '../../../../public/account.svg'
import LogoutImage from '../../../../public/logout.svg'

const Profile: FC = () => {
    return (
        <div className='text-black mr-8 hover:cursor-pointer flex justify-evenly relative group text-2xl rounded-lg'>
            <button>Settings</button>
            <Image src={DownArrowImage} alt='DownArrow' height={20} width={20} className='m-1'/>
            <div className='flex flex-col justify-around items-center absolute top-10 bg-gray-100 text-center w-40 opacity-0 group-hover:opacity-100'>
               <Link href='/profile' className='w-full pb-2 pt-2 hover:bg-white flex justify-center items-center'>
                    <Image src={AccountImage} alt='Account' height={20} width={20} className='mr-2'/>
                    <span>Profile</span>
                </Link>
               <Link href='/logout' className='w-full pb-2 pt-2 hover:bg-white flex justify-center items-center'>
                    <Image src={LogoutImage} alt='Account' height={20} width={20} className='mr-2'/>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    )
}

export default Profile