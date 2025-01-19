import { useState } from "react"
import { AddPostForm } from "./AddPostForm"
import { Modal } from "./ui/Modal"
import { Gear, House, NotePencil, SignIn, SignOut, User, UserPlus } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const authContext = useAuth()

    return(
        <div className="flex flex-col gap-2 border-solid border-r-2 border-gray-300 p-2 h-full">
            {
                authContext.isLoggedIn
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
                    <Link 
                        className="button-default flex flex-row gap-2 justify-center sm:justify-normal"
                        to={"/configuration"}>
                        <Gear size={24} />
                        <p className="hidden sm:block">Configuration</p>
                    </Link>
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
                        onClick={ () => authContext.logoutUser() }>
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