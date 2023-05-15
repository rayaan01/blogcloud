'use client'

import Link from "next/link"
import { useState } from "react"
import { FormEvent } from "react"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-6/12 h-96 shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Login</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="username">Username</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/4">
                    <label className="text-3xl" htmlFor="password">Password</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <button className="bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-4 mt-6 hover:bg-green-800 text-lg">Submit</button>
                <p className="mb-24 mt-4 text-lg"> 
                Don't have an account? <Link className="underline text-cyan-800" href='/signup'>Sign up!</Link>
                </p>
            </form>
        </div>
    )
}   

export default Login