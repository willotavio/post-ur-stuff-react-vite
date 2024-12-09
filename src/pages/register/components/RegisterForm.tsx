import { useEffect, useState } from 'react';
import { register } from '../../../services/api/user';
import { UserAdd } from '../../../constants/types/user';
import { InputField } from '../../../components/ui/InputField';
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from '../../../components/ui/ErrorToast';
import { XCircle } from '@phosphor-icons/react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'react-router-dom'

export const RegisterForm = () => {
    
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Partial<UserAdd>>({} as UserAdd)
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
    const validateDisplayName = (value: string) => {
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
    const validateEmail = (value: string) => {
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
    const validatePassword = (value: string) => {
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
    const validatePasswordConfirmation = (value: string) => {
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
            usernameError: null,
            displayNameError: null,
            emailError: null,
            passwordError: null,
            passwordConfirmationError: null
        }
        
        var usernameValidation = validateUsername(formData.username ? formData.username as string : "")
        if(usernameValidation !== true) {
            newErrors.usernameError = usernameValidation
        }
        var displayNameValidation = validateDisplayName(formData.displayName ? formData.displayName as string : "")
        if(displayNameValidation !== true) {
            newErrors.displayNameError = displayNameValidation
        }
        var emailValidation = validateEmail(formData.email ? formData.email as string : "")
        if(emailValidation !== true) {
            newErrors.emailError = emailValidation
        }
        var passwordValidation = validatePassword(formData.password ? formData.password as string : "")
        if(passwordValidation !== true) {
            newErrors.passwordError = passwordValidation
        }
        var passwordConfirmationValidation = validatePasswordConfirmation(formData.passwordConfirmation ? formData.passwordConfirmation as string : "")
        if(passwordConfirmationValidation !== true) {
            newErrors.passwordConfirmationError = passwordConfirmationValidation
        }

        if(formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmationError = "Passwords don't match"
        }

        setFormErrors(newErrors)
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
            const response = await register(formData as UserAdd)
            if(response.isSuccessful) {
                navigate("/")
            }
            else {
                setServerError("Bad request")
                setFormErrors({ ...formErrors, 
                    usernameError: response.responseBody.username,
                    displayNameError: response.responseBody.displayName,
                    emailError: response.responseBody.email,
                    passwordError: response.responseBody.password,
                    passwordConfirmationError: response.responseBody.passwordConfirmation,
                })
            }
        }
    }

    return(
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            {
                serverError
                &&
                <ErrorToast message={serverError} icon={XCircle} />
            }
            <h1 className="text-4xl">Register</h1>
            
            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField 
                        type='text' 
                        id='username' 
                        label='Username' 
                        name='username' 
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
                        type='text' 
                        id='displayName' 
                        label='Display name' 
                        name='displayName' 
                        error={formErrors.displayNameError}
                        callback={(value) => {
                            const result = validateDisplayName(value)
                            setFormData({ ...formData, displayName: value }) 
                            var displayNameError = ""
                            if(result !== true) {
                                displayNameError = result
                            }
                            setFormErrors({ ...formErrors, displayNameError })
                        }}
                    />
                </div>
                
                <InputField 
                    type='text' 
                    id='email' 
                    label='Email' 
                    name='email' 
                    error={formErrors.emailError}
                    callback={(value) => {
                        const result = validateEmail(value)
                        setFormData({ ...formData, email: value })
                        var emailError = ""
                        if(result !== true) {
                            emailError = result
                        }
                        setFormErrors({ ...formErrors, emailError })
                    }}
                />
                <InputField 
                    type='password' 
                    id='password' 
                    label='Password'  
                    name='password' 
                    error={formErrors.passwordError}
                    callback={(value) => {
                        const result = validatePassword(value)
                        setFormData({ ...formData, password: value })
                        var passwordError = ""
                        if(result !== true) {
                            passwordError = result
                        }
                        setFormErrors({ ...formErrors, passwordError, passwordConfirmationError: ""})
                    }}
                />
                <InputField 
                    type='password' 
                    id='passwordConfirmation' 
                    label='Password Confirmation' 
                    name='passwordConfirmation' 
                    error={formErrors.passwordConfirmationError}
                    callback={(value) => {
                        const result = validatePasswordConfirmation(value)
                        setFormData({ ...formData, passwordConfirmation: value })
                        var passwordConfirmationError = ""
                        if(result !== true) {
                            passwordConfirmationError = result
                        }
                        setFormErrors({ ...formErrors, passwordConfirmationError })
                    }}
                />
                <button type='submit' className='button-default sm:w-1/3 w-2/3 flex items-center justify-between'>Submit<ArrowRight size={24} /></button>
                <Link className='text-xs text-neutral-500 hover:opacity-80' to={"/login"}>Already have an account?</Link>
            </form>
        </div>
    )
}