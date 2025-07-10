import { useEffect } from "react"
import { LoginForm } from "./components/LoginForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const LoginPage = () => {
    const navigate = useNavigate()
    const { isLoggedIn, isLoading } = useAuth()
    useEffect(() => {
        if(!isLoading && isLoggedIn) {
            navigate("/")
        }
    })

    return(
        !isLoading 
        && !isLoggedIn
        &&
        <div className="flex min-h-screen">
            <LoginForm />
        </div>
    )
}