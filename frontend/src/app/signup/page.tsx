'use client'

import { FormEvent, useState } from "react"
import Image from 'next/image'
import SpinnerComponent from '../../../public/spinner.svg'
import Link from "next/link"

const Signup = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    const [details, setDetails] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center w-6/12 h-[70%] shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-8 text-cyan-800">Signup</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/6">
                    <label className="text-3xl" htmlFor="fName">First Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="fName" id="fName" onChange={(e) => setDetails({...details, firstName: e.target.value})} value={details.firstName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/6">
                    <label className="text-3xl" htmlFor="lName">Last Name</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="lName" id="lName" onChange={(e) => setDetails({...details, lastName: e.target.value})} value={details.lastName}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/6">
                    <label className="text-3xl" htmlFor="email">Email</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="text" name="email" id="email" onChange={(e) => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text- w-full h-1/6">
                    <label className="text-3xl" htmlFor="password">Password</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl mt-1" type="password" name="password" id="password" onChange={(e) => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-4 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                    <span>{loading && spinner}</span>
                    <span>{loading ? 'Submitting...' : 'Submit'}</span>
                </button>
                <p className="mb-24 mt-4 text-lg"> 
                <span>Already have an account?</span>
                <Link className="underline text-cyan-800 ml-1" href='/signup'>Login!</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup