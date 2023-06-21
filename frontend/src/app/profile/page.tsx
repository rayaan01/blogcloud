'use client'

import type { ChangeEvent, FC, FormEvent } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import type { Id } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify'
import { parse } from 'cookie'
import type { Cookies, UserContext } from '@/types'
import validate from 'validator'
import { TOAST_MESSAGES, userDetails } from '@/utils/constants'
import { customFetch } from '@/core/customFetch'
import { serialize } from 'cookie'
import { getCookieMaxAge } from '@/core/getCookieMaxAge'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { Spinner } from '@/components/images/Spinner'
import { User } from '@/components/images/User'
import Image from 'next/image'

const failedToast = (message: TOAST_MESSAGES): Id => toast.error(message)
const successToast = (message: TOAST_MESSAGES): Id => toast.success(message)

const validateBody = ({ firstName, lastName }: {
    firstName: string,
    lastName: string
}): boolean => {
    const isFirstNameValid = validate.isAlpha(firstName)
    if (!isFirstNameValid) {
        failedToast(TOAST_MESSAGES.FIRST_NAME_TOAST)
        return false
    }

    const islastNameValid = validate.isAlpha(lastName)
    if (!islastNameValid) {
        failedToast(TOAST_MESSAGES.LAST_NAME_TOAST)
        return false
    }

    return true
}

const Profile: FC = () => {
    const [user, setUser] = useState<UserContext>(userDetails)
    const [loading, setLoading] = useState(false)
    const [fileUploadText, setFileUploadText] = useState('Update your profile image!')
    const [image, setImage] = useState<JSX.Element>(User)

    useEffect(() => {
        const { token } = parse(document.cookie) as Cookies
        const tokenPayload = window.atob(token.split('.')[1])
        const user = JSON.parse(tokenPayload) as UserContext
        setUser(user)
    }, [])

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!validateBody({
                firstName: user.firstName,
                lastName: user.lastName
            })) {
                setLoading(false)
                return
            }
    
            const response = await customFetch.post({
                path: '/profile',
                body: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })

            if (response && response.ok) {
                const { status } = await response.json()
                const token = response.headers.get('token')
                if (status === 'success' && token) {
                    setLoading(false)
                    document.cookie = serialize('token', token, {
                        sameSite: 'strict',
                        secure: true,
                        path: '/',
                        maxAge: getCookieMaxAge()
                    })
                    successToast(TOAST_MESSAGES.UPDATE_TOAST_SUCCESS)
                } else {
                    setLoading(false)
                    failedToast(TOAST_MESSAGES.UPDATE_TOAST)
                }
            } else {
                setLoading(false)
                failedToast(TOAST_MESSAGES.UPDATE_TOAST)
            }
        } catch (err) {
            setLoading(false)
            failedToast(TOAST_MESSAGES.SOMETHING_WENT_WRONG)
        }
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        if (e.target.files) {
            setFileUploadText(e.target.files[0].name)
            const url = URL.createObjectURL(e.target.files[0])
            const uploadedImage = <Image src={url} alt="Profile" width={120} height={20} className="inline mr-2 overflow-hidden rounded-[50%]"/>
            setImage(uploadedImage)
        }
    }

    return (
        <div className='h-screen bg-gray-300'>
            <NavBar user={user} />
            <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-1/2 h-3/4 shadow-md mb-24" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Manage your account</h1>
                <div className='flex justify-center items-center'>
                    <span>{image}</span>
                    <label className='text-3xl text-blue-950 hover:cursor-pointer hover:shadow-md' htmlFor='ProfileImage'> 
                       {fileUploadText}
                    </label>
                    <input className='hidden' type='file' id="ProfileImage" onChange={handleFileUpload}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="FirstName">First Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="firstName" id="firstName" onChange={(e): void => setUser({ ...user, firstName: e.target.value })} value={user.firstName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="LastName">Last Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="lastName" id="lastName" onChange={(e): void => setUser({ ...user, lastName: e.target.value })} value={user.lastName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="Email">Email</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1 bg-gray-200 hover:cursor-not-allowed" type="text" name="email" id="email" disabled={true} onChange={(e): void => setUser({ ...user, email: e.target.value })} value={user.email}/>
                </div>
                <div className='flex justify-evenly items-center w-full'>
                    <Link href='/home' className='bg-red-500 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-6 text-lg hover:bg-red-800'>Back</Link>
                    <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                        <span>{loading && Spinner}</span>
                        <span>{loading ? 'Updating...' : 'Update'}</span>
                    </button>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    newestOnTop={true}
                    closeOnClick={true}
                    hideProgressBar={true}
                    pauseOnFocusLoss
                    theme="colored"
                />
            </form>
        </div>
        </div> 
    )
}

export default Profile