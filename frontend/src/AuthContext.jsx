import {useContext, createContext, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null)

    const [username, setUsername] = useState("")

    const value = {token, setToken, username, setUsername}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider