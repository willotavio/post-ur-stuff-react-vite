import { PostVisibility } from "../../constants/enums"
import { PostAdd, PostUpdate } from "../../constants/types/post"
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

export const addPost = (post: PostAdd) => {
    return apiFetch("/post", {
        method: "POST",
        body: JSON.stringify(post)
    })
}

export const updatePost = (id: string, post: PostUpdate) => {
    return apiFetch(`/post/${id}`, {
        method: "PATCH",
        body: JSON.stringify(post)
    })
}

export const deletePost = (id: string) => {
    return apiFetch(`/post/${id}`, {
        method: "DELETE"
    })
}