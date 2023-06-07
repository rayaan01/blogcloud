import Link from 'next/link'
import type { FC } from 'react'
import Settings from './components/Settings'
import type { Cookies, UserContext } from '@/types'
import { parse } from 'cookie'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Home: FC = () => {
    const cookie = headers().get('cookie')
    if (!cookie) {
        redirect('/login')
    }

    const { token } = parse(cookie) as Cookies
    const tokenPayload = atob(token.split('.')[1])
    const user = JSON.parse(tokenPayload) as UserContext

    return (
        <div className='h-screen bg-gray-300'>
            <div className='flex justify-between items-center h-[7%] bg-gradient-to-r from-gray-100 to-gray-300'>
                <Link href='/home' className='text-black text-3xl ml-8'>BlogCloud</Link>
                <span className='text-3xl text-blue-900'>
                    Welcome, {user.firstName}
                </span>
                <Settings />
            </div>
            <div className='w-full bg-slate-100 p-2'>
                <span className='text-lg'>You have no posts yet!</span>
                <Link href='/create' className='text-lg ml-2 text-blue-500'>Create one</Link>
            </div>
        </div>
    )
}

export default Home