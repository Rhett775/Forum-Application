import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const baseURL = import.meta.env.VITE_BASE_URL;

    const {setToken, username, setUsername} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await fetch (baseURL+"/api/forum/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, password: password, email: email})
            })

            if (response.ok) {
                const data = await response.json()
                setToken(data.accessToken)
                navigate('/posts')

            } else {
                console.log("Error signing up")
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-2 flex-wrap ml-auto w-full">
            <h1 className="font-bold text-5xl text-white font-sans w-full justify-center text-center mb-8" >Sign Up</h1>
            <form className="w-full space-y-6 px-4 justify-center" onSubmit={handleSubmit}>
                <div className="flex w-full justify-center">
                    <label className="font-semibold text-white font-sans text-xl w-1/2 text-right pr-4 mr-[20%]">Username:
                        <input className="m-2 rounded-md text-black w-1/2" type="text" placeholder=" Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div className="flex w-full justify-center">
                    <label className="font-semibold text-white font-sans text-xl w-1/2 text-right pr-4 mr-[20%]">Email:
                        <input className="m-2 rounded-md text-black w-1/2" type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div className="flex w-full justify-center">
                    <label className="font-semibold text-white font-sans text-xl w-1/2 text-right pr-4 mr-[20%]">Password:
                        <input className="m-2 rounded-md text-black w-1/2" type="password" placeholder=" Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <input className="bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans font-semibold w-[30%] text-2xl cursor-pointer" type="submit" value="Sign Up"></input>
            </form>
        </div>
    )
}

export default Signup