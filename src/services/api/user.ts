import { UserAdd, UserLogin } from "../../constants/types";
import { apiFetch } from "./apiFetch";

export const register = (user: UserAdd) => {
    return apiFetch("/user/register", {
        method: "POST",
        body: JSON.stringify(user)
    })
}

export const login = (user: UserLogin) => {
    return apiFetch("/user/login", {
        method: "POST",
        body: JSON.stringify(user)
    })
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