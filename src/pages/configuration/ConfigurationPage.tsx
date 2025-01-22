import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../layouts/MainLayout"
import { UpdateUserForm } from "./components/UpdateUserForm"
import { useAuth } from "../../context/AuthContext"
import { UpdatePasswordForm } from "./components/UpdatePasswordForm"

export const ConfigurationPage = () => {
    const { isLoggedIn, userInfo, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoading && !isLoggedIn) {
            navigate("/login")
        }
    }, [isLoading])

    return (
        <MainLayout>
            {
                isLoggedIn
                &&
                userInfo
                &&
                <div className="flex flex-col gap-2 m-2">
                    <h1 className="text-2xl text-center">Update your info</h1>
                    <UpdateUserForm userData={userInfo} />
                    <h1 className="text-2xl text-center">Update your password</h1>
                    <UpdatePasswordForm />
                </div>
            }
        </MainLayout>
    )
}