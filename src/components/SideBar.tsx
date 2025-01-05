import { useState } from "react"
import { useIsAuth } from "../hooks/useIsAuth"
import { AddPostForm } from "./AddPostForm"
import { Modal } from "./ui/Modal"
import { logout } from "../services/api/user"
import { Gear, House, NotePencil, SignIn, SignOut, User, UserPlus } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const isLoggedIn = useIsAuth()

    const logoutUser = async () => {
        await logout()
    }

    return(
        <div className="flex flex-col gap-2 border-solid border-r-2 border-gray-300 p-2 h-full">
            {
                isLoggedIn
                ?
                <>
                    <Link
                        className="button-default flex flex-row gap-2 justify-center sm:justify-normal"
                        to={"/"}>
                        <House size={24} />
                        <p className="hidden sm:block">Home</p>
                    </Link>
                    <Link
                        className="button-default flex flex-row gap-2 justify-center sm:justify-normal"
                        to={"/profile"}>
                        <User size={24} />
                        <p className="hidden sm:block">Profile</p>
                    </Link>
                    <button 
                        className="button-default flex flex-row gap-2 justify-center sm:justify-normal">
                        <Gear size={24} />
                        <p className="hidden sm:block">Configuration</p>
                    </button>
                    <button 
                        className="button-default flex flex-row gap-2 justify-center sm:justify-normal" 
                        onClick={() => setIsOpen(!isOpen)}>
                        <NotePencil size={24} /> 
                        <p className="hidden sm:block">New post</p>
                    </button>
                    {
                        isOpen
                        &&
                        <Modal setIsOpen={ setIsOpen } >
                            <div>
                                <AddPostForm callback={() => {}} />
                            </div>
                        </Modal>
                    }
                    <button 
                        className="button-default !bg-gray-600 hover:!bg-opacity-80 flex flex-row gap-2 justify-center sm:justify-normal" 
                        onClick={ () => logoutUser() }>
                        <SignOut size={24} />
                        <p className="hidden sm:block">Logout</p>
                    </button>
                </>
                :
                <>
                    <Link className="button-default flex flex-row gap-2 justify-center sm:justify-normal" to={"/login"}>
                        <SignIn size={24} />
                        <p className="hidden sm:block">Login</p>
                    </Link>
                    <Link className="button-default flex flex-row gap-2 justify-center sm:justify-normal" to={"/register"}>
                        <UserPlus size={24} />
                        <p className="hidden sm:block">Register</p>
                    </Link>
                </>
            }
        </div>
    )
}