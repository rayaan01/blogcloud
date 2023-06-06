'use client'

import Link from 'next/link'
import type { FC } from 'react'
import Settings from './components/Settings'
import type { Cookies, UserContext } from '@/types'
import { parse } from 'cookie'

const Home: FC = () => {
    const { token } = parse(document.cookie) as Cookies
    const tokenPayload = window.atob(token.split('.')[1])
    const user = JSON.parse(tokenPayload) as UserContext

    return (
        <div className='h-screen bg-gray-300'>
            <div className='flex justify-between items-center h-[7%] bg-gradient-to-r from-gray-100 to-gray-300'>
                <Link href='/home' className='text-black text-3xl ml-8'>BlogCloud</Link>
                <span className='text-3xl text-blue-900'>Welcome, {user.firstName}</span>
                <Settings/>
            </div>
        </div>
    )
}

export default Home