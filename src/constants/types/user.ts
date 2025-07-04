import { UserVisibility } from "../enums";

export type User = {
    id: string,
    username: string,
    displayName: string,
    email: string,
    joinedAt: Date,
    birthDate: Date,
    accountVisibility: UserVisibility
    profilePicture?: string,
    profileCover?: string,
    description?: string
}

export type UserAdd = {
    username: string,
    displayName: string,
    email: string,
    password: string,
    passwordConfirmation: string;
}

export type UserLogin = {
    username: string,
    password: string
}

export type UserUpdate = {
    username?: string,
    displayName?: string,
    email?: string,
    birthDate?: string,
    accountVisibility?: UserVisibility,
    profilePicture?: string,
    profileCover?: string,
    description?: string
}

export type PasswordUpdate = {
    newPassword?: string,
    newPasswordConfirmation?: string,
    currentPassword?: string
}