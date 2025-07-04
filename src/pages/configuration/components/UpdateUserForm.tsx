import { User, UserUpdate } from "../../../constants/types/user"
import { InputField } from "../../../components/ui/InputField"
import { ArrowRight, Check, XCircle } from "@phosphor-icons/react"
import { updateProfile } from "../../../services/api/user"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "react-toastify"

import * as Yup from "yup"
import { useFormik } from "formik"

type TProps = {
    userData: User
}

const formSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, "Too short. Min: 4 characters")
        .max(16, "Too long. Max: 16 characters")
        .required("Enter an username"),
    displayName: Yup.string()
        .min(4, "Too short. Min: 4 characters")
        .max(32, "Too long. Max: 32 characters")
        .required("Enter an username"),
    description: Yup.string()
        .max(32, "Too long. Max: 32 characters"),
    birthDate: Yup.string()
})

export const UpdateUserForm = ({ userData }: TProps) => {
    const { fetchOwnProfile } = useAuth()

    let notify = () => toast("")

    const formik = useFormik({
        initialValues: {
            username: userData.username,
            displayName: userData.displayName,
            description: userData.description,
            birthDate: userData.birthDate.toString()
        },
        validationSchema: formSchema,
        onSubmit: values => {
            updateUser(values)
        }
    })

    const updateUser = async (userInfo: UserUpdate) => {
        if(!(formik.values.username === userData.username
            && formik.values.displayName === userData.displayName
            && formik.values.description === userData.description
            && formik.values.birthDate === userData.birthDate.toString())
        ) {
            const response = await updateProfile(userInfo)
            if(response.isSuccessful) {
                await fetchOwnProfile()
                notify = () => toast("Profile updated", {type: "success", icon: Check})
                notify()
            }
            else {
                notify = () => toast("Bad request", {type: "error", icon: XCircle})
                notify()
            }
        }
    }
    
    return (
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            <form className="flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
                <InputField 
                    type="text"
                    value={formik.values.username}
                    id="username"
                    label="Username"
                    name="username"
                    defaultValue={userData.username}
                    error={formik.touched.username ? formik.errors.username : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type="text"
                    value={formik.values.displayName}
                    id="displayName"
                    label="Display name"
                    name="displayName"
                    defaultValue={userData.displayName}
                    error={formik.touched.displayName ? formik.errors.displayName : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type="text"
                    value={formik.values.description ?? ""}
                    id="description"
                    label="Description"
                    name="description"
                    defaultValue={userData.description}
                    error={formik.touched.description ? formik.errors.description : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    type="date"
                    value={formik.values.birthDate}
                    id="birthDate"
                    label="Birth date"
                    name="birthDate"
                    error={formik.touched.birthDate ? formik.errors.birthDate : undefined}
                    defaultValue={userData?.birthDate?.toString().split("T")[0] ?? null}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <button type="submit" className='button-default sm:w-1/3 w-2/3 flex items-center justify-between'>Update<ArrowRight size={24} /></button>
            </form>
        </div>
    )
}