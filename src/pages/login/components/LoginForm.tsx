import { useState } from "react"
import { UserLogin } from "../../../constants/types/user"
import { InputField } from "../../../components/ui/InputField"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, X } from "@phosphor-icons/react"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "react-toastify"

export const LoginForm = () => {
    
    const { loginUser } = useAuth()

    const navigate = useNavigate()
    const [formData, setFormData] = useState<Partial<UserLogin>>({} as UserLogin)
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({})

    let notify = () => toast("")

    const validateUsername = (value: string) => {
        if(value.length > 4 && value.length < 16) {
            return true
        }
        else {
            var usernameError = ""
            if(value.length < 1) {
                usernameError = "Enter an username"
            }
            else if(value.length < 4) {
                usernameError = "Too short. Min: 4 characters"
            }
            else if(value.length > 16) {
                usernameError = "Too long. Max: 16 characters"
            }
            return usernameError
        }
    }

    const validatePassword = (value: string) => {
        if(value.length >= 8) {
            return true
        }
        else {
            var passwordError = ""
            if(value.length < 1) {
                passwordError = "Enter a password"
            }
            else if(value.length < 8) {
                passwordError = "Too short. Min: 8 characters"
            }
            return passwordError
        }
    }

    const validateForm = () => {
        const newFormErrors: Record<string, string | null> = {
            usernameError: null,
            passwordError: null
        }
        const validatedUsername = validateUsername(formData.username ? formData.username : "")
        if(validatedUsername !== true) {
            newFormErrors.usernameError = validatedUsername
        }
        const validatedPassword = validatePassword(formData.password ? formData.password : "")
        if(validatedPassword !== true) {
            newFormErrors.passwordError = validatedPassword
        }

        setFormErrors(newFormErrors)

        return Object.values(newFormErrors).every(value => value === "" || value === null)
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const result = validateForm()
        if(result) {
            const isSuccessful = await loginUser(formData as UserLogin)
            if(isSuccessful) {
                navigate("/")
            }
            else {
                notify = () => toast("Invalid credentials", {type: "error", icon: X})
                notify()
            }
        }
    }

    return(
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl">Login</h1>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <InputField 
                    type="text"
                    id="username" 
                    name="username"
                    label="Username"
                    error={formErrors.usernameError}
                    callback={(value) => {
                        const result = validateUsername(value)
                        setFormData({ ...formData, username: value })
                        var usernameError = ""
                        if(result !== true) {
                            usernameError = result
                        }
                        setFormErrors({ ...formErrors, usernameError })
                    }}
                />
                <InputField 
                    type="password"
                    id="password" 
                    name="password"
                    label="Password"
                    error={formErrors.passwordError}
                    callback={(value) => {
                        var result = validatePassword(value)
                        setFormData({ ...formData, password: value })
                        var passwordError = ""
                        if(result !== true) {
                            passwordError = result
                        }
                        setFormErrors({ ...formErrors, passwordError })
                    }}
                />
                <button className="button-default flex sm:w-1/3 w-2/3 items-center justify-between">Submit<ArrowRight size={24} /></button>
                <Link className='text-xs text-neutral-500 hover:opacity-80' to={"/register"}>Don't have an account yet?</Link>
            </form>
        </div>
    )
}