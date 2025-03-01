import React, { useRef, useState } from "react"
import { InputField } from "../../../components/ui/InputField"
import { ArrowRight, Check, X } from "@phosphor-icons/react"
import { updatePassword } from "../../../services/api/user"
import { PasswordUpdate } from "../../../constants/types/user"
import { toast } from "react-toastify"

export const UpdatePasswordForm = () => {

    type FormErrors = {
        newPasswordError?: string,
        newPasswordConfirmationError?: string,
        currentPasswordError?: string
    }

    const [formData, setFormData] = useState<Partial<PasswordUpdate>>()
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    let notify = () => toast("")

    const formRef = useRef<HTMLFormElement>(null)

    const validateNewPassword = (value: string) => {
        var newPasswordError
        if(value.length >= 8) {
            return true
        }
        else if(value.length < 8) {
            newPasswordError = "Too short. Min: 8 characters"
        }
        return newPasswordError
    }
    
    const validateNewPasswordConfirmation = (value: string) => {
        var newPasswordError
        if(value.length >= 8) {
            return true
        }
        else if(value.length < 8) {
            newPasswordError = "Too short. Min: 8 characters"
        }
        return newPasswordError
    }
    
    const validateCurrentPassword = (value: string) => {
        var newPasswordError
        if(value.length >= 8) {
            return true
        }
        else if(value.length < 8) {
            newPasswordError = "Too short. Min: 8 characters"
        }
        return newPasswordError
    }

    const validateForm = () => {
        var newFormErrors: FormErrors = {}

        if(formData?.newPassword !== formData?.newPasswordConfirmation) {
            newFormErrors.newPasswordConfirmationError = "Passwords don't match"
        }

        var newPasswordValidation = validateNewPassword(formData?.newPassword ?? "")
        if(newPasswordValidation !== true) {
            newFormErrors.newPasswordError = newPasswordValidation
        }

        var newPasswordConfirmationValidation = validateNewPasswordConfirmation(formData?.newPasswordConfirmation ?? "")
        if(newPasswordConfirmationValidation !== true) {
            newFormErrors.newPasswordConfirmationError = newPasswordConfirmationValidation
        }

        var currentPasswordValidation = validateCurrentPassword(formData?.currentPassword ?? "")
        if(currentPasswordValidation !== true) {
            newFormErrors.currentPasswordError = currentPasswordValidation
        }

        setFormErrors(newFormErrors)
        return Object.values(newFormErrors).every((value) => value === "" || !value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = validateForm()
        if(result) {
            const response = await updatePassword(formData as PasswordUpdate)
            if(response.isSuccessful) {
                notify = () => toast("Password updated", {type: "success", icon: Check})
                notify()
                formRef.current?.reset()
                setFormData({})
            }
            else {    
                notify = () => toast(response.responseBody.message, {type: "error", icon: X})
                notify()
            }
        }
    }

    return (
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputField 
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    error={formErrors.newPasswordError}
                    callback={(value: string) => {
                        var result = validateNewPassword(value)
                        setFormData({ ...formData, newPassword: value })
                        var newPasswordError
                        if(result !== true) {
                            newPasswordError = result
                        }
                        setFormErrors({ ...formErrors, newPasswordError })
                    } }>
                </InputField>
                <InputField 
                    type="password"
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    label="New Password Confirmation"
                    error={formErrors.newPasswordConfirmationError}
                    callback={(value: string) => {
                        var result = validateNewPasswordConfirmation(value)
                        setFormData({ ...formData, newPasswordConfirmation: value })
                        var newPasswordConfirmationError
                        if(result !== true) {
                            newPasswordConfirmationError = result
                        }
                        setFormErrors({ ...formErrors, newPasswordConfirmationError })
                    } }>
                </InputField>
                <InputField 
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    error={formErrors.currentPasswordError}
                    callback={(value: string) => {
                        var result = validateCurrentPassword(value)
                        setFormData({ ...formData, currentPassword: value })
                        var currentPasswordError
                        if(result !== true) {
                            currentPasswordError = result
                        }
                        setFormErrors({ ...formErrors, currentPasswordError })
                    } }>
                </InputField>

                <button className="button-default flex sm:w-1/3 w-2/3 items-center justify-between" type="submit">Update <ArrowRight size={24} /></button>
            </form>
        </div>
    )
}