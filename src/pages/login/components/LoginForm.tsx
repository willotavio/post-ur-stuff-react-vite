import { useEffect, useState } from "react"
import { login } from "../../../services/api/user"
import { UserLogin } from "../../../constants/types"
import { InputField } from "../../../components/ui/InputField"
import { useNavigate } from "react-router-dom"
import { ErrorToast } from "../../../components/ui/ErrorToast"
import { ArrowRight, XCircle } from "@phosphor-icons/react"

export const LoginForm = () => {
    
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Partial<UserLogin>>({} as UserLogin)
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({})
    const [serverError, setServerError] = useState("")

    useEffect(() => {
        if(serverError) {
            const timer = setTimeout(() => {
                setServerError("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [serverError])

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
        var newFormErrors = {
            usernameError: "",
            passwordError: ""
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
            const response = await login(formData as UserLogin)
            if(response.isSuccesful) {
                navigate("/")
            }
            else {
                setServerError("Invalid credentials")
            }
        }
    }

    return(
        <div className="flex flex-col gap-8 w-1/3 m-auto p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl">Login</h1>
            {
                serverError
                &&
                <ErrorToast message={serverError} icon={XCircle} />
            }
            <form className="grid grid-rows-2 gap-4" onSubmit={handleSubmit}>
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
                label="password"
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
            <button className="button-default flex items-center justify-between">Submit <ArrowRight size={24} /></button>
        </form>
        </div>
    )
}