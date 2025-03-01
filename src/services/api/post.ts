import { PostVisibility } from "../../constants/enums"
import { PostAdd, PostUpdate } from "../../constants/types/post"
import { apiFetch } from "./apiFetch"

export const getAllPublicPosts = (page: string="", size: string="", sortDirection: string="") => {
    return apiFetch(`/post?page=${page}&size=${size}&sortDirection=${sortDirection}`, {
        method: "GET"
    })
}

export const getPostById = (id: string, page: string="", size: string="", sortDirection: string="") => {
    return apiFetch(`/post/${id}?page=${page}&size=${size}&sortDirection=${sortDirection}`, {
        method: "GET"
    })
}

export const getOwnPosts = (page: string="", size: string="", sortDirection: string="") => {
    return apiFetch(`/post/me?page=${page}&size=${size}&sortDirection=${sortDirection}`, {
        method: "GET"
    })
}

export const getOwnPostsWithVisibility = (visibility: PostVisibility, page: string="", size: string="", sortDirection: string="") => {
    return apiFetch(`/post/me/${PostVisibility[visibility.valueOf()]}?page=${page}&size=${size}&sortDirection=${sortDirection}`, {
        method: "GET"
    })
}

export const getPublicPostsByUserId = (userId: string, page: string="", size: string="", sortDirection: string="") => {
    return apiFetch(`/post/user/${userId}?page=${page}&size=${size}&sortDirection=${sortDirection}`, {
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