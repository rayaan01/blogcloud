'use client'

import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { FC, FormEvent } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import type { UserContext } from '@/types'
import { TOAST_MESSAGES, userDetails } from '@/utils/constants'
import validate from 'validator'
import { failedToast } from '@/core/failedToast'
import { customFetch } from '@/core/customFetch'
import { spinner } from '@/components/Spinner'

const validateInput = ({ title, content }: {
    title: string,
    content: string
}): boolean => {
    const isValidTitle = validate.isLength(title, {
        min: 3,
        max: 60
    })
    if (!isValidTitle) {
        failedToast(TOAST_MESSAGES.BLOG_TITLE_TOAST)
        return false
    }

    const isValidContent = validate.isLength(content, {
        min: 12,
        max: 2000
    })
    if (!isValidContent) {
        failedToast(TOAST_MESSAGES.BLOG_CONTENT_TOAST)
        return false
    }
    return true
}

const Blog: FC = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UserContext>(userDetails)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const cookie = document.cookie
        if (!cookie) redirect('/login')
        const user = getUserFromCookie(cookie)
        setUser(user)
    }, [])

    const submitHandler = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)
        const details = { title, content }
        if (!validateInput(details)) {
            setLoading(false)
            return
        }
        const response = await customFetch.post({
            path: '/blog',
            body: details
        })
        if (response) {
            const { status } = await response.json()
            if (status !== 'success' || !response.ok) {
                setLoading(false)
                failedToast(TOAST_MESSAGES.BLOG_TOAST)
            } else {
                setLoading(false)
                redirect('/home')
            }
        } else {
            setLoading(false)
            failedToast(TOAST_MESSAGES.BLOG_TOAST)
        }
    }

    return (
        <div className='h-screen bg-gray-300'>
            <NavBar user={user}/>
            <div className='flex justify-center items-center h-[93%] w-full'>
                <form action="submit" className='flex flex-col justify-start items-center w-full h-full' onSubmit={submitHandler}>
                    <h1 className='text-5xl mb-6 mt-8 text-cyan-800'>Create a post</h1>
                    <div className="flex flex-col justify-start items-center mt-3 text-center w-full h-1/6">
                        <label className="text-3xl" htmlFor="title">Title</label>
                        <input className="outline-none pt-2 pb-2 pl-4 pr-4 w-6/12 text-xl mt-1" type='text' name="title" id="title" placeholder='eg. How do Blockchains work?' value={title} onChange={(e): void => setTitle(e.target.value)}/>
                    </div>
                    <div className="flex flex-col justify-start items-center w-full h-[52%]">
                        <label className="text-3xl" htmlFor="content">Content</label>
                        <textarea className="outline-none pl-4 pr-4 pt-2 pb-2 w-1/2 h-5/6 text-xl mt-1 resize-none" name="content" id="content" placeholder="eg. A Blockchain is a distributed database or ledger shared among a computer network's nodes" value={content} onChange={(e): void => setContent(e.target.value)}/>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <Link href='/home' className='pt-2 pb-2 pl-4 pr-4 mb-8 mt-2 mr-12 text-lg bg-red-500 text-white hover:bg-red-800 text-center'>Back</Link>
                        <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-2 ml-12 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
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