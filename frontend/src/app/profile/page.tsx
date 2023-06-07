'use client'

import type { FC, FormEvent } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import type { Id } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify'
import SpinnerComponent from '../../../public/spinner.svg'
import Image from 'next/image'
import { parse } from 'cookie'
import type { Cookies, UserContext } from '@/types'
import validate from 'validator'
import { TOAST_MESSAGES } from '@/utils/constants'
import { customFetch } from '@/core/customFetch'
import { serialize } from 'cookie'
import { getCookieMaxAge } from '@/core/getCookieMaxAge'
import Link from 'next/link'

const failedToast = (message: TOAST_MESSAGES): Id => toast.error(message)
const successToast = (message: TOAST_MESSAGES): Id => toast.success(message)

const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

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
    const [details, setDetails] = useState({ firstName: '', lastName: '', email: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const { token } = parse(document.cookie) as Cookies
        const tokenPayload = window.atob(token.split('.')[1])
        const user = JSON.parse(tokenPayload) as UserContext
        const currentDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        setDetails(currentDetails)
    }, [])

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!validateBody(details)) {
                setLoading(false)
                return
            }
    
            const response = await customFetch.post({
                path: '/profile',
                body: {
                    firstName: details.firstName,
                    lastName: details.lastName
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
                    failedToast(TOAST_MESSAGES.UPDATE_TOAST)
                }
            } else {
                failedToast(TOAST_MESSAGES.UPDATE_TOAST)
            }
        } catch (err) {
            failedToast(TOAST_MESSAGES.SOMETHING_WENT_WRONG)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-6/12 h-4/6 shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Manage your account</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="FirstName">First Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="firstName" id="firstName" onChange={(e): void => setDetails({ ...details, firstName: e.target.value })} value={details.firstName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="LastName">Last Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="lastName" id="lastName" onChange={(e): void => setDetails({ ...details, lastName: e.target.value })} value={details.lastName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="Email">Email</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1 bg-gray-200 hover:cursor-not-allowed" type="text" name="email" id="email" disabled={true} onChange={(e): void => setDetails({ ...details, email: e.target.value })} value={details.email}/>
                </div>
                <div className='flex justify-evenly items-center w-full'>
                    <Link href='/home' className='bg-red-500 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-6 text-lg hover:bg-red-800'>Back</Link>
                    <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                        <span>{loading && spinner}</span>
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
    )
}

export default Profile