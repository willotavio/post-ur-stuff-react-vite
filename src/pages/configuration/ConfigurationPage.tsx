import { useEffect, useState } from "react"
import { useIsAuth } from "../../hooks/useIsAuth"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../../layouts/MainLayout"
import { UpdateUserForm } from "../profile/components/UpdateUserForm"
import { getOwnProfile } from "../../services/api/user"
import { User } from "../../constants/types/user"

export const ConfigurationPage = () => {
    const isLoggedIn = useIsAuth()
    const navigate = useNavigate()

    const [loggedUser, setLoggedUser] = useState<User>()

    useEffect(() => {
        if(isLoggedIn === false) {
            navigate("/login")
        }
        fetchLoggedUser()
    }, [isLoggedIn])

    const fetchLoggedUser = async () => {
        const response = await getOwnProfile()
        if(response.isSuccessful) {
            setLoggedUser(response.responseBody.user)
        }
    }

    return (
        <MainLayout>
            {
                isLoggedIn
                &&
                loggedUser
                &&
                <div className="flex flex-col gap-2 m-2">
                    <h1 className="text-2xl text-center">Update your info</h1>
                    <UpdateUserForm userData={loggedUser} />
                </div>
            }
        </MainLayout>
    )
}