const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <form className="flex flex-col justify-center items-center -mt-64 w-6/12 h-96 shadow-md">
                <h1 className="text-5xl mb-8">Login</h1>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="username">Username</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl" type="text" name="username" id="username"/>
                </div>
                <div className="flex flex-col justify-evenly items-center m-3 text-center w-full h-1/4">
                    <label className="text-3xl" htmlFor="password">Password</label>
                    <input className="block border outline-none p-2 w-6/12 text-center text-xl" type="password" name="password" id="password"/>
                </div>
                <button className="bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 mb-4 mt-6 hover:bg-green-800">Submit</button>
            </form>   
        </div>
    )
}

export default Login