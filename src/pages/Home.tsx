import { getAllUsers, logout } from "../services/api/user"
import { Link } from "react-router-dom"
import { useIsAuth } from "../hooks/useIsAuth"

export const Home = () => {
    const isLoggedIn = useIsAuth()

    const test = async () => {
        const result = await getAllUsers()
        console.log(result)
    }

    const logoutUser = async () => {
        const result = await logout()
        console.log(result)
    }

    return(
        <div>
            <h2>Welcome</h2>
            {
                isLoggedIn
                ? <>
                    <button onClick={ () => test() }>Get all users</button>
                    <button onClick={() => logoutUser()}>Logout</button>
                </>
                    
                : <>
                    <Link to={"/login"}>Login</Link>
                </>
            }
        </div>
    )
}