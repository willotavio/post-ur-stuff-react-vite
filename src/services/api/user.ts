import { UserAdd, UserLogin } from "../../constants/types/user";
import { apiFetch } from "./apiFetch";

export const register = async (user: UserAdd) => {
    const response = await fetch(`${import.meta.env.VITE_POSTURSTUFF_API_URI}/user/register`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    })

    const isSuccessful = response.ok
    const statusCode = response.status

    let responseBody
    try {
        responseBody = await response.json()
    } catch(error) {
        console.log(error)
        responseBody = { error: "Error while trying to process the response body" }
    }
    return { isSuccessful, statusCode, responseBody }
}

export const login = async (user: UserLogin) => {
    const response = await fetch(`${import.meta.env.VITE_POSTURSTUFF_API_URI}/user/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        credentials: "include",
        body: JSON.stringify(user)
    })

    const isSuccessful = response.ok
    const statusCode = response.status

    let responseBody
    try {
        responseBody = await response.json()
    } catch(error) {
        responseBody = { error: "Error while trying to process the response body" }
    }

    return { isSuccessful, statusCode, responseBody }
}

export const logout = async () => {
    const response = await apiFetch("/user/logout", { 
        method: "POST" 
    })
    window.location.href = "/"
    return response
}

export const getAllUsers = () => {
    return apiFetch("/user", {
        method: "GET"
    })
}

export const getOwnProfile = () => {
    return apiFetch("/user/me", {
        method: "GET"
    })
}

export const getProfileByUsername = (username: string) => {
    return apiFetch(`/user/username/${username}`, {
        method: "GET"
    })
}