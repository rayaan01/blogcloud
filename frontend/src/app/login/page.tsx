const Login = () => {
    return (
        <div className="flex flex-row border-solid border-black border-2 w-1/2">
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username"/>
            </div>
        </div>
    )
}

export default Login