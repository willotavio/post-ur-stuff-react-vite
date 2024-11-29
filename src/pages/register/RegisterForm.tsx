import { useEffect, useState } from 'react';
import { register } from '../../services/api/user';
import { UserAdd } from '../../constants/types';
import { InputField } from '../../components/ui/InputField';
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<Partial<UserAdd>>({} as UserAdd)

    const [errors, setErrors] = useState<Record<string, string | null>>({})

    const [serverError, setServerError] = useState("")

    useEffect(() => {
        if(serverError) {
            const timer = setTimeout(() => {
                setServerError("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [serverError])


    const verifyUsername = (value: string) => {
        if(value.length >= 4
            && value.length <= 16
        ) {
            return true
        }
        else {
            var usernameError = "";
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
    const verifyDisplayName = (value: string) => {
        if(value.length >= 4
            && value.length <= 32
        ) {
            return true
        }
        else {
            var displayNameError = "";
            if(value.length < 1) {
                displayNameError = "Enter a display name"
            }
            else if(value.length < 4) {
                displayNameError = "Too short. Min: 4 characters"
            }
            else if(value.length > 32) {
                displayNameError = "Too long. Max: 32 characters"
            }
            return displayNameError
        }
    }
    const verifyEmail = (value: string) => {
        if(value.length >= 1) {
            return true
        }
        else {
            var emailError = "";
            if(value.length < 1) {
                emailError = "Enter an email"
            }
            return emailError
        }
    }
    const verifyPassword = (value: string) => {
        if(value.length >= 8
        ) {
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
    const verifyPasswordConfirmation = (value: string) => {
        if(value.length >= 8
        ) {
            return true
        }
        else {
            var passwordConfirmationError = ""
            if(value.length < 1) {
                passwordConfirmationError = "Confirm the password"
            }
            else if(value.length < 8) {
                passwordConfirmationError = "Too short. Min: 8 characters"
            }
            return passwordConfirmationError
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string | null> = {
            username: null,
            displayName: null,
            email: null,
            password: null,
            passwordConfirmation: null
        }
        
        var usernameValidation = verifyUsername(formData.username ? formData.username as string : "")
        if(usernameValidation !== true) {
            newErrors.username = usernameValidation
        }
        var displayNameValidation = verifyDisplayName(formData.displayName ? formData.displayName as string : "")
        if(displayNameValidation !== true) {
            newErrors.displayName = displayNameValidation
        }
        var emailValidation = verifyEmail(formData.email ? formData.email as string : "")
        if(emailValidation !== true) {
            newErrors.email = emailValidation
        }
        var passwordValidation = verifyPassword(formData.password ? formData.password as string : "")
        if(passwordValidation !== true) {
            newErrors.password = passwordValidation
        }
        var passwordConfirmationValidation = verifyPasswordConfirmation(formData.passwordConfirmation ? formData.passwordConfirmation as string : "")
        if(passwordConfirmationValidation !== true) {
            newErrors.passwordConfirmation = passwordConfirmationValidation
        }

        if(formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "Passwords don't match"
        }

        setErrors(newErrors)
        if(Object.values(newErrors).every(value => value === "" || value === null)) {
            return true
        }
        else {
            return false
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = validateForm()
        if(result) {
            register(formData as UserAdd).then((result) => {
                if(result.isSuccesful) {
                    navigate("/")
                }
                else {
                    setServerError("Bad request")
                    setErrors({ ...errors, 
                        username: result.responseBody.username,
                        displayName: result.responseBody.displayName,
                        email: result.responseBody.email,
                        password: result.responseBody.password,
                        passwordConfirmation: result.responseBody.passwordConfirmation,
                    })
                }
            })
        }
    }

    return(
        <div className="flex flex-col gap-y-10 items-center">
            <h1 className="text-4xl">Register</h1>
            {
                serverError
                &&
                <div className="fixed z-50 bg-red-600 text-white p-2 rounded-lg m-2 animate-fadeInOut">
                    <p>{ serverError }</p>
                </div>
            }
            
            <form className="flex flex-col max-w-64 gap-y-8" onSubmit={handleSubmit}>
                <InputField 
                    type='text' 
                    id='username' 
                    label='Username:' 
                    name='username' 
                    error={errors["username"]}
                    callback={(value) => {
                        var result = verifyUsername(value)
                        if(result === true) {    
                            setFormData({ ...formData, username: value })
                            setErrors({ ...errors, username: "" })
                        }
                        else {
                            setErrors({ ...errors, username: result })
                        }
                    }}
                />
                <InputField 
                    type='text' 
                    id='displayName' 
                    label='Display name:' 
                    name='displayName' 
                    error={errors["displayName"]}
                    callback={(value) => {
                        var result = verifyDisplayName(value)
                        if(result === true) {
                            setFormData({ ...formData, displayName: value }) 
                            setErrors({ ...errors, displayName: "" })
                        }
                        else {
                            setErrors({ ...errors, displayName: result })
                        }
                    }}
                />
                <InputField 
                    type='text' 
                    id='email' 
                    label='Email:' 
                    name='email' 
                    error={errors["email"]}
                    callback={(value) => {
                        var result = verifyEmail(value)
                        if(result === true) {
                            setFormData({ ...formData, email: value })
                            setErrors({ ...errors, email: "" })
                        }
                        else {
                            setErrors({ ...errors, email: result })
                        }
                    }}
                />
                <InputField 
                    type='password' 
                    id='password' 
                    label='Password:'  
                    name='password' 
                    error={errors["password"]}
                    callback={(value) => {
                        var result = verifyPassword(value)
                        if(result === true) {
                            setFormData({ ...formData, password: value })
                            setErrors({ ...errors, password: "", passwordConfirmation: "" })
                        }
                        else {
                            setErrors({ ...errors, password: result})
                        }
                    }}
                />
                <InputField 
                    type='password' 
                    id='passwordConfirmation' 
                    label='Password Confirmation:' 
                    name='passwordConfirmation' 
                    error={errors["passwordConfirmation"]}
                    callback={(value) => {
                        var result = verifyPasswordConfirmation(value)
                        if(result === true) {
                            setFormData({ ...formData, passwordConfirmation: value })
                            setErrors({ ...errors, passwordConfirmation: "" })
                        }
                        else {
                            setErrors({ ...errors, passwordConfirmation: result })
                        }
                    }}
                />
                <button type='submit' className='button-default'>Send</button>
            </form>
        </div>
    )
}