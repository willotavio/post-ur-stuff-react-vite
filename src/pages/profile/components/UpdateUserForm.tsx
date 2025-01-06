import React, { useEffect, useState } from "react"
import { User, UserUpdate } from "../../../constants/types/user"
import { ToastMessage } from "../../../components/ui/ToastMessage"
import { InputField } from "../../../components/ui/InputField"
import { ArrowRight, XCircle } from "@phosphor-icons/react"
import { updateProfile } from "../../../services/api/user"

type TProps = {
    userData: User
}

export const UpdateUserForm = ({ userData }: TProps) => {
    const [formData, setFormData] = useState<UserUpdate>({})
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({})
    const [serverMessage, setServerMessage] = useState("")

    useEffect(() => {
        setFormData({
            username: userData.username,
            displayName: userData.displayName,
            description: userData.description,
            birthDate: userData.birthDate
        })
    }, [])

    useEffect(() => {
        if(serverMessage) {
            const timer = setTimeout(() => {
                setServerMessage("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [serverMessage])

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
    
    const validateDescription = (value: string) => {
        if(value.length <= 32) {
            return true
        }
        else {
            var descriptionError = ""
            if(value.length > 32) {
                descriptionError = "Too long. Max: 32 characters"
            }
            return descriptionError
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string | null> = {
            descriptionError: null,
            usernameError: null,
            displayNameError: null
        }
        var usernameValidation = validateUsername(formData.username ?? "")
        if(usernameValidation !== true) {
            newErrors.usernameError = usernameValidation
        }
        var displayNameValidation = validateUsername(formData.displayName ?? "")
        if(displayNameValidation !== true) {
            newErrors.displayNameError = displayNameValidation
        }
        var descriptionValidation = validateDescription(formData.description ?? "")
        if(descriptionValidation !== true) {
            newErrors.descriptionError = descriptionValidation
        }
        setFormErrors(newErrors)
        if(Object.values(newErrors).every(value => value === "" || value == null)) {
            return true
        }
        else {
            return false
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const result = validateForm()
        if(result) {
            if(formData.username === userData.username
                && formData.displayName === userData.displayName
                && formData.description === userData.description
                && formData.birthDate === userData.birthDate
            ) {
                console.log("qwie")
            }
            else {
                const response = await updateProfile(formData)
                console.log(response)
            }
        }
        else {
            console.log(result)
        }
    }
    
    return (
        <div className="flex flex-col gap-8 w-2/3 sm:w-[24rem] m-auto p-6 rounded-lg shadow-lg">
            {
                serverMessage
                &&
                <ToastMessage message={serverMessage} icon={XCircle} backgroundColor="error" />
            }
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <InputField 
                        type="text"
                        id="username"
                        label="Username"
                        name="username"
                        defaultValue={userData.username}
                        error={formErrors.usernameError}
                        callback={(value) => {
                            const result = validateUsername(value)
                            setFormData({ ...formData, username: value })
                            var usernameError = ""
                            if(result != true) {
                                usernameError = result
                            }
                            setFormErrors({ ...formErrors, usernameError })
                        }}
                    />
                </div>
                <InputField 
                    type="text"
                    id="displayName"
                    label="Display name"
                    name="displayName"
                    defaultValue={userData.displayName}
                    error={formErrors.displayNameError}
                    callback={(value) => {
                        const result = validateDisplayName(value)
                        setFormData({ ...formData, displayName: value })
                        var displayNameError = ""
                        if(result != true) {
                            displayNameError = result
                        }
                        setFormErrors({ ...formErrors, displayNameError })
                    }}
                />
                <InputField 
                    type="text"
                    id="description"
                    label="Description"
                    name="description"
                    defaultValue={userData.description}
                    error={formErrors.descriptionError}
                    callback={(value) => {
                        const result = validateDescription(value)
                        setFormData({ ...formData, description: value })
                        var descriptionError = ""
                        if(result != true) {
                            descriptionError = result
                        }
                        setFormErrors({ ...formErrors, descriptionError })
                    }}
                />
                <InputField 
                    type="date"
                    id="birthDate"
                    label="Birth date"
                    name="birthDate"
                    defaultValue={userData?.birthDate?.toString().split("T")[0] ?? null}
                    callback={(value) => {
                        if(value !== null && value !== "") {
                            setFormData({ ...formData, birthDate: new Date(value) })
                        }
                    }}
                />
                <button type="submit" className='button-default sm:w-1/3 w-2/3 flex items-center justify-between'>Update<ArrowRight size={24} /></button>
            </form>
        </div>
    )
}