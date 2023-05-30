'use client'

import type { FC } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SpinnerComponent from '../../../public/spinner.svg'
import Image from 'next/image'

const spinner = <Image src={SpinnerComponent} alt="Loading Spinner" width={25} height={25} className="inline mr-2"/>

const Profile: FC = () => {
    const initialConfig = {
        firstName: 'Rayaan',
        lastName: 'Hussain',
        email: 'md.rayaan.h@gmail.com'
    }

    const [details, setDetails] = useState(initialConfig)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (): void => {
        setLoading(true)
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
                <button className={`bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-8 mt-6 text-lg ${!loading && 'hover:bg-green-800'}`} disabled={loading}>
                    <span>{loading && spinner}</span>
                    <span>{loading ? 'Updating...' : 'Update'}</span>
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
            </form>
        </div>
    )
}

export default Profile