import Cookies from "js-cookie"

// wrapper to any api fetch that handles 401 responses

export const apiFetch = async (url: string, options: RequestInit) => {
    try {
        const defaultOptions: RequestInit = {
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: "include"
        }
    
        options = { ...defaultOptions, ...options }
    
        let response = await fetch(
            `${import.meta.env.VITE_POSTURSTUFF_API_URI}${url}`, options)
        
        const isSuccessful = response.ok
        const statusCode = response.status
    
        if(statusCode === 401) {
            handleUnauthorized()
        }
    
        let responseBody
        try {
            responseBody = await response.json()
        } catch(error) {
            responseBody = { error: "Error while trying to process the response body" }
        }
    
        return { isSuccessful, statusCode, responseBody } 
    }
    catch(error) {
        console.log(error)
        return { isSuccessful: false };
    }
}

const handleUnauthorized = () => {
    Cookies.remove("isLoggedIn")
    window.location.href = "/login"
}