export interface User {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string,
    projects: string[]
}

export interface Login {
    email: string,
    password: string
}

export interface Registration {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
}