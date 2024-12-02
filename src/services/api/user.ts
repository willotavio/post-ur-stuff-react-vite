import { UserAdd, UserLogin } from "../../constants/types";

export const register = async (user: UserAdd) => {
    let response = await fetch(`${import.meta.env.VITE_POSTURSTUFF_API_URI}/user/register`, 
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user)
        }
    )
    const isSuccesful = response.ok
    const statusCode = response.status

    let responseBody
    try {
        responseBody = await response.json()
    } catch(error) {
        responseBody = { error: "Error while trying to process the response body" }
    }

    return { isSuccesful, statusCode, responseBody }
}

export const login = async (user: UserLogin) => {
    let response = await fetch(`${import.meta.env.VITE_POSTURSTUFF_API_URI}/user/login`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user),
            credentials: "include"
        }
    )

    const isSuccesful = response.ok
    const statusCode = response.status

    let responseBody
    try {
        responseBody = await response.json()
    } catch(error) {
        responseBody = { error: "Error while trying to process the response body" }
    }

    return { isSuccesful, statusCode, responseBody }
}

export const getAllUsers = async () => {
    let response = await fetch(`${import.meta.env.VITE_POSTURSTUFF_API_URI}/user`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
            },
            credentials: "include",
        }
    )

    const isSuccesful = response.ok
    const status = response.status

    var responseBody

    try {
        responseBody = await response.json()
    } catch(error) {
        responseBody = { error: "Error while trying to process the response body" }
    }

    return { isSuccesful, status, responseBody }

}