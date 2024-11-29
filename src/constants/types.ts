import { UserVisibility } from "./enums";

export type User = {
    id: string,
    username: string,
    displayName: string,
    email: string,
    joinedAt: Date,
    birthDate: Date,
    accountVisibility: UserVisibility
    profilePicture?: string,
    profileCover?: string
}

export type UserAdd = {
    username: string,
    displayName: string,
    email: string,
    password: string,
    passwordConfirmation: string;
}

export type UserUpdate = {
    username?: string,
    displayName?: string,
    email?: string,
    birthDate?: Date,
    accountVisibility?: UserVisibility,
    profilePicture?: string,
    profileCover?: string
}