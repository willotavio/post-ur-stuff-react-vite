import { useNavigate } from "react-router-dom"
import { RegisterForm } from "./components/RegisterForm"
import { useIsAuth } from "../../hooks/useIsAuth"
import { useEffect } from "react"

export const RegisterPage = () => {
    const navigate = useNavigate()
    const isLoggedIn = useIsAuth()
    useEffect(() => {
        if(isLoggedIn) {
            navigate("/")
        }
    })
    return(
        !isLoggedIn
        &&
        <div className="flex min-h-screen">
            <RegisterForm />
        </div>
    )
}