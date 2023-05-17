'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FormEvent } from "react"
import { postFetch } from "@/utils/customFetch"
import SpinnerComponent from "../../../public/spinner.svg"
import { TOKEN } from "@/utils/constants"
import { createCookie } from "@/utils/createCookie"
 
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const response = await postFetch({
            path: '/login',
            body: {
                email,
                password
            }
        })
        setLoading(false)
        if (response) {
            const token = response.headers.get(TOKEN)
            const { status } = await response.json()
            if (status === 'success' && token) {
                document.cookie = createCookie({ key: 'token', value: token })
                setSuccess(true)
            }
        }
    }

    if (success) {
        return (
            <div>
                Logged in Successfully
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-6/12 h-96 shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Login</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="username">Email</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="username" id="username" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="password">Password</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-4 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                    <span>{loading && spinner}</span>
                    <span>{loading ? 'Submitting...' : 'Submit'}</span>
                </button>
                <p className="mb-24 mt-4 text-lg"> 
                <span>Don't have an account?</span>
                <Link className="underline text-cyan-800 ml-1" href='/signup'>Sign up!</Link>
                </p>
            </form>
        </div>
    )
}

export default Login