import { InputField } from "../../../components/ui/InputField"
import { ArrowRight, Check, X } from "@phosphor-icons/react"
import { updatePassword } from "../../../services/api/user"
import { PasswordUpdate } from "../../../constants/types/user"
import { toast } from "react-toastify"

import * as Yup from "yup"
import { useFormik } from "formik"

const formSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Enter a password"),
    newPasswordConfirmation: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Confirm the password")
        .oneOf([Yup.ref("newPassword")], "Passwords don't match"),
    currentPassword: Yup.string()
        .min(8, "Too short. Min: 8 characters")
        .required("Confirm the password")
})

export const UpdatePasswordForm = () => {

    let notify = () => toast("")
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            newPasswordConfirmation: "",
            currentPassword: ""
        },
        validationSchema: formSchema,
        onSubmit: values => {
            update(values)
        }
    })

    const update = async (passwordInfo: PasswordUpdate) => {
        const response = await updatePassword(passwordInfo)
        if(response.isSuccessful) {
            notify = () => toast("Password updated", {type: "success", icon: Check})
            notify()
            formik.resetForm()
        }
        else {    
            notify = () => toast(response.responseBody.message, {type: "error", icon: X})
            notify()
        }
    }

    return (
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <InputField 
                    type="password"
                    value={formik.values.newPassword}
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    >
                </InputField>
                <InputField 
                    type="password"
                    value={formik.values.newPasswordConfirmation}
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    label="New Password Confirmation"
                    error={formik.touched.newPasswordConfirmation ? formik.errors.newPasswordConfirmation : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                </InputField>
                <InputField 
                    type="password"
                    value={formik.values.currentPassword}
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    error={formik.touched.currentPassword ? formik.errors.currentPassword : undefined }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                </InputField>

                <button className="button-default flex sm:w-1/3 w-2/3 items-center justify-between" type="submit">Update <ArrowRight size={24} /></button>
            </form>
        </div>
    )
}