import { useEffect, useState } from 'react';
import { register } from '../../../services/api/user';
import { UserAdd } from '../../../constants/types/user';
import { InputField } from '../../../components/ui/InputField';
import { useNavigate } from 'react-router-dom'
import { ToastMessage } from '../../../components/ui/ToastMessage';
import { XCircle } from '@phosphor-icons/react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'react-router-dom'

import * as Yup from "yup"
import { useFormik } from 'formik';

const formSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, "Too short. Min: 4 characters")
        .max(16, "Too long. Max: 16 characters")
        .required("Enter an username"),
    displayName: Yup.string()
        .min(4, "Too short. Min: 4 characters")
        .max(32, "Too long. Max: 32 characters")
        .required("Enter an username"),
    email: Yup.string()
        .email("Enter a valid email")
        .required("Enter an email"),
    password: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Enter a password"),
    passwordConfirmation: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Confirm the password")
        .oneOf([Yup.ref("password")], "Passwords don't match")
})

export const RegisterForm = () => {
    
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")
    const formik = useFormik({
        initialValues: {
            username: "",
            displayName: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        validationSchema: formSchema,
        onSubmit: values => {
            registerUser(values)
        }
    })

    const registerUser = async (userInfo: UserAdd) => {
        const response = await register(userInfo)
            if(response.isSuccessful) {
                navigate("/")
            }
            else {
                setServerError("Bad request")
            }
    }

    useEffect(() => {
        if(serverError) {
            const timer = setTimeout(() => {
                setServerError("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [serverError])

    return(
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            {
                serverError
                &&
                <ToastMessage message={serverError} icon={XCircle} backgroundColor='error' />
            }
            <h1 className="text-4xl">Register</h1>
            
            <form className='flex flex-col gap-y-4' onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField 
                        type='text' 
                        value={formik.values.username}
                        id='username' 
                        label='Username' 
                        name='username' 
                        error={ formik.touched.username ? formik.errors.username : undefined }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField 
                        type='text' 
                        value={formik.values.displayName}
                        id='displayName' 
                        label='Display name' 
                        name='displayName' 
                        error={ formik.touched.displayName ? formik.errors.displayName : undefined }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                
                <InputField 
                    type='text' 
                    value={formik.values.email}
                    id='email' 
                    label='Email' 
                    name='email' 
                    error={ formik.touched.email ? formik.errors.email : undefined }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type='password' 
                    value={formik.values.password}
                    id='password' 
                    label='Password'  
                    name='password' 
                    error={formik.touched.password ? formik.errors.password : undefined }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type='password' 
                    value={formik.values.passwordConfirmation}
                    id='passwordConfirmation' 
                    label='Password Confirmation' 
                    name='passwordConfirmation' 
                    error={formik.touched.passwordConfirmation ? formik.errors.passwordConfirmation : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <button type='submit' className='button-default sm:w-1/3 w-2/3 flex items-center justify-between'>Submit<ArrowRight size={24} /></button>
                <Link className='text-xs text-neutral-500 hover:opacity-80' to={"/login"}>Already have an account?</Link>
            </form>
        </div>
    )
}