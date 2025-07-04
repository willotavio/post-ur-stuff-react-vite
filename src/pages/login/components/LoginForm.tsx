import { UserLogin } from "../../../constants/types/user"
import { InputField } from "../../../components/ui/InputField"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, X } from "@phosphor-icons/react"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "react-toastify"

import * as Yup from "yup"
import { useFormik } from "formik"

const formSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, "Too short. Min: 4 characters")
        .max(16, "Too long. Max: 16 characters")
        .required("Enter an username"),
    password: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Enter a password")
})

export const LoginForm = () => {
    
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    let notify = () => toast("")

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: values => {
            login(values)
        },
        validationSchema: formSchema
    })

    const login = async (userData: UserLogin) => {
        const isSuccessful = await loginUser(userData)
        if(isSuccessful) {
            navigate("/")
        }
        else {
            notify = () => toast("Invalid credentials", {type: "error", icon: X})
            notify()
        }
    }

    return(
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl">Login</h1>
            <form className="flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
                <InputField 
                    type="text"
                    value={formik.values.username}
                    id="username" 
                    name="username"
                    label="Username"
                    error={ formik.touched.username ? formik.errors.username : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type="password"
                    value={formik.values.password}
                    id="password" 
                    name="password"
                    label="Password"
                    error={ formik.touched.password ? formik.errors.password : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <button className="button-default flex sm:w-1/3 w-2/3 items-center justify-between">Submit<ArrowRight size={24} /></button>
                <Link className='text-xs text-neutral-500 hover:opacity-80' to={"/register"}>Don't have an account yet?</Link>
            </form>
        </div>
    )
}