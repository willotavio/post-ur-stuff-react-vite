import { PostVisibility } from "../enums"
import { User } from "./user"

export type Post = {
    id: string,
    content?: string,
    images?: string[],
    user: User,
    createdAt: Date,
    editedAt?: Date,
    visibility: PostVisibility
}

export type PostAdd = {
    content?: string,
    images?: string[],
    visibility?: PostVisibility
}

export type PostUpdate = {
    content?: string,
    images?: string[]
    visibility?: PostVisibility | number
}