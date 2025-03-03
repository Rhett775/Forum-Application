import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'

const Login = () => {

    const [password, setPassword] = useState("")

    const baseURL = import.meta.env.VITE_BASE_URL;
    
    const navigate = useNavigate()

    const {setToken, username, setUsername} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch (baseURL+"/api/forum/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, password: password})
            })

            if (response.ok) {
                const data = await response.json()
                setToken(data.accessToken)
                navigate("/posts")
            } else {
                console.log("Login Failed")
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-2 flex-wrap ml-auto w-full">
            <h1 className="font-bold text-5xl text-white font-sans w-full justify-center text-center mb-8">Login</h1>
            <form onSubmit={handleSubmit}>
                <label className="font-semibold text-white font-sans text-xl block w-full">Username:
                    <input className="m-2 rounded-md text-black" type="text" placeholder=" Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="font-semibold text-white font-sans text-xl block w-full">Password:
                    <input className="m-2 rounded-md text-black" type="password" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input className="font-semibold bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans w-[30%] text-2xl cursor-pointer" type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login