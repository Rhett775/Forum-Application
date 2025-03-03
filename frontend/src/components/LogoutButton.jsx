import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

const LogoutButton = () => {

    const {setToken, setUsername} = useAuth()

    const navigate = useNavigate()

    const baseURL = import.meta.env.VITE_BASE_URL;

    const handleClick = async () => {

        await fetch(baseURL+"/api/forum/logout", {
            method: "POST",
        })
        setToken(null)
        setUsername("")
        navigate("/")
    }

    return (
        <button onClick={handleClick} className="bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans font-semibold w-[10%] text-2xl absolute right-4 cursor-pointer">Logout</button>
    )
}

export default LogoutButton