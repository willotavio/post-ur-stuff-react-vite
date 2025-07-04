import { createContext, useContext, useEffect, useState } from "react";
import { User, UserLogin } from "../constants/types/user";
import { getOwnProfile, login } from "../services/api/user";

type TAuthContext = {
    isLoggedIn: boolean,
    userInfo: User | null,
    loginUser: (user: UserLogin) => Promise<boolean>,
    logoutUser: () => Promise<boolean>,
    fetchOwnProfile: () => Promise<void>,
    isLoading: boolean  // since isLoggedIn is false by default
                        // the component must await this context useEffect 
                        // to finish load before trying to redirect user
}

const AuthContext = createContext<TAuthContext>({
    isLoggedIn: false,
    userInfo: null,
    loginUser: async () => false,
    logoutUser: async () => false,
    fetchOwnProfile: async () => {},
    isLoading: true
})

type TAuthProvider = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: TAuthProvider) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token !== null && token !== undefined) {
            const fetchProfile = async () => {
                await fetchOwnProfile()
                setIsLoading(false)
            }
            fetchProfile()
        }
        else {
            setIsLoading(false)
        }
    }, [])

    const loginUser = async (user: UserLogin) => {
        const response = await login(user)
        if(response.isSuccessful) {
            localStorage.setItem("token", response.responseBody.token)
            setIsLoggedIn(true)
            await fetchOwnProfile()
        }
        return response.isSuccessful
    }

    const logoutUser = async () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUserInfo(null)
        return true
    }

    const fetchOwnProfile = async () => {
        const response = await getOwnProfile()
        if(response.isSuccessful) {
            setIsLoggedIn(true)
            setUserInfo(response.responseBody.user)
        }
        else {
            setIsLoggedIn(false)
            setUserInfo(null)
        }
    }

    return (
        <AuthContext.Provider value={ { isLoggedIn, userInfo, loginUser, logoutUser, fetchOwnProfile, isLoading } }>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}