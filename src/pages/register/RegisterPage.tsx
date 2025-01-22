import { useNavigate } from "react-router-dom"
import { RegisterForm } from "./components/RegisterForm"
import { useEffect } from "react"
import { MainLayout } from "../../layouts/MainLayout"
import { useAuth } from "../../context/AuthContext"

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { isLoggedIn, isLoading } = useAuth()
    useEffect(() => {
        if(!isLoading && isLoggedIn) {
            navigate("/")
        }
    })
    return(
        !isLoggedIn
        && !isLoading
        &&
        <MainLayout>
            <div className="flex min-h-screen">
                <RegisterForm />
            </div>
        </MainLayout>
    )
}