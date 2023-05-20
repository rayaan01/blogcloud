'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { FC , FormEvent } from 'react'
import { useState } from 'react'
import { postFetch } from '@/core/customFetch'
import SpinnerComponent from '../../../public/spinner.svg'
import { AUTH_COOKIE, TOAST_MESSAGES } from '@/utils/constants'
import { redirect } from 'next/navigation'
import { serialize } from 'cookie'
import { getCookieMaxAge } from '@/core/getCookieMaxAge'
import type { Id} from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify'
import validator from 'validator'

const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

const failedToast = (message: TOAST_MESSAGES): Id => toast.error(message)

const validateInput = ({
    email,
    password
}: {
    email: string
    password: string
}): boolean => {
    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        failedToast(TOAST_MESSAGES.EMAIL_TOAST)
    }

    const isPasswordStrong = validator.isStrongPassword(password, {
        minLength: 5,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    if (!isPasswordStrong) {
        failedToast(TOAST_MESSAGES.PASSWORD_TOAST)
        return false
    }

    return true
}
 
const Login: FC = () => {
    const initialState = {
        email: '',
        password: ''
    }
    const [details, setDetails] = useState(initialState)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        if (!validateInput(details)) {
            setLoading(false)
            return
        }

        const response = await postFetch({
            path: '/login',
            body: details
        })

        setLoading(false)

        if (response) {
            const token = response.headers.get(AUTH_COOKIE)
            const { status } = await response.json()
            if (status === 'success' && token) {
                document.cookie = serialize('token', token, {
                    sameSite: 'strict',
                    secure: true,
                    path: '/',
                    maxAge: getCookieMaxAge()
                })
                setSuccess(true)
            } else {
                failedToast(TOAST_MESSAGES.LOGIN_TOAST)
            }
        } else {
            failedToast(TOAST_MESSAGES.LOGIN_TOAST)
        }
    }

    if (success) {
        redirect('/home')
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-6/12 h-96 shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Login</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="email">Email</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="email" id="email" onChange={(e): void => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="password">Password</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="password" name="password" id="password" onChange={(e): void => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-4 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                    <span>{loading && spinner}</span>
                    <span>{loading ? 'Submitting...' : 'Submit'}</span>
                </button>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    newestOnTop={true}
                    closeOnClick={true}
                    hideProgressBar={true}
                    pauseOnFocusLoss
                    theme="colored"
                />
                <p className="mb-24 mt-4 text-lg"> 
                <span>Don&apos;t have an account?</span>
                <Link className="underline text-cyan-800 ml-1" href='/signup'>Sign up!</Link>
                </p>
            </form>
        </div>
    )
}

export default Login