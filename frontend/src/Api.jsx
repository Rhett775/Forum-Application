import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from './AuthContext.jsx'


const api = () => {

    const apiUrl = import.meta.env.VITE_BASE_URL + "/api/forum";

    const {token, setToken} = useAuth()

    const axiosApi = axios.create({

        baseURL: apiUrl,
        headers:{
            'Content-Type': 'application/json',
        }

    })

    axiosApi.interceptors.request.use(
        (config) => {

            if(!token)
                return config

            const decodedToken = jwtDecode(token)

            if (!decodedToken.exp)
                refreshToken()

            config.headers['Authorization'] = `Bearer ${token}`

            return config

        }, (error) => {
            console.log(error)
        }
    )

    async function refreshToken() {

        try {
            const response = await axios.get("http://localhost:3000/api/forum/refresh")
            setToken(response.accessToken)
        } catch (error) {
            console.log(error)
        }

    }

    return axiosApi
}

export default api