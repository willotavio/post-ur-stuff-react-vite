import { useEffect } from "react"
import { useIsAuth } from "../../hooks/useIsAuth"
import { LoginForm } from "./components/LoginForm"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../layouts/MainLayout"

export const LoginPage = () => {
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
        <MainLayout>
            <div className="flex min-h-screen">
                <LoginForm />
            </div>
        </MainLayout>
    )
}