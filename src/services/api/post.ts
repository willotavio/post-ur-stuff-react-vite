import { PostVisibility } from "../../constants/enums"
import { apiFetch } from "./apiFetch"

export const getAllPublicPosts = () => {
    return apiFetch("/post", {
        method: "GET"
    })
}

export const getPostById = (id: string) => {
    return apiFetch(`/post/${id}`, {
        method: "GET"
    })
}

export const getOwnPosts = () => {
    return apiFetch("/post/me", {
        method: "GET"
    })
}

export const getOwnPostsWithVisibility = (visibility: PostVisibility) => {
    return apiFetch(`/post/me/${PostVisibility[visibility.valueOf()]}`, {
        method: "GET"
    })
}

export const getPublicPostsByUserId = (userId: string) => {
    return apiFetch(`/post/user/${userId}`, {
        method: "GET"
    })
}