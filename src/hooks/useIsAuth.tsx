import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export const useIsAuth = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    const isAuth = () => {
        const isLoggedIn = Cookies.get("isLoggedIn")
        return isLoggedIn === "true"
    }

    useEffect(() => {
        setIsLoggedIn(isAuth())
    }, [])
    
    return isLoggedIn
}