import Link from 'next/link'
import type { FC } from 'react'
import Profile from './components/Profile'

const Home: FC = () => {
    return (
        <div className='h-screen bg-gray-300'>
            <div className='flex justify-between items-center h-[7%] bg-gray-100'>
                <Link href='/home' className='text-black text-3xl ml-8'>BlogCloud</Link>
                <span className='text-3xl text-cyan-600'>Welcome, Rayaan</span>
                <Profile/>
            </div>
        </div>
    )
}

export default Home