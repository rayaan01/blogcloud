'use client'

import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { useState } from 'react'
import SpinnerComponent from '../../../public/spinner.svg'
import Image from 'next/image'

const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

const Blog: FC = () => {
    const [loading, setLoading] = useState(false)

    const cookie = document.cookie
    if (!cookie) redirect('/login')
    const user = getUserFromCookie(cookie)
    
    return (
        <div className='h-screen bg-gray-300'>
            <NavBar user={user}/>
            <div className='flex justify-center items-center h-[93%] w-full'>
                <form action="submit" className='flex flex-col justify-start items-center w-full h-full'>
                    <h1 className='text-5xl mb-6 mt-8 text-cyan-800'>Create a post</h1>
                    <div className="flex flex-col justify-start items-center mt-3 text-center w-full h-1/6">
                        <label className="text-3xl" htmlFor="title">Title</label>
                        <input className="block border outline-none pt-2 pb-2 pl-4 pr-4 w-6/12 text-xl mt-1" type="text" name="title" id="title" placeholder='eg. How do Blockchains work?'/>
                    </div>
                    <div className="flex flex-col justify-start items-center text-center w-full h-[52%]">
                        <label className="text-3xl" htmlFor="content">Content</label>
                        <input className="block border outline-none p-2 w-1/2 h-5/6 text-xl mt-1" type="text" name="content" id="content"/>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <Link href='/home' className='w-24 pt-2 pb-2 pl-4 pr-4 mb-8 mt-2 mr-12 text-lg bg-red-500 text-white hover:bg-red-800 text-center'>Back</Link>
                        <button className={`bg-green-600 text-white w-24 pt-2 pb-2 pl-4 pr-4 mb-8 mt-2 ml-12 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                            <span>{loading && spinner}</span>
                            <span>{loading ? 'Creating...' : 'Create'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Blog