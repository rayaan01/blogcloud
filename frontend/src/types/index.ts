export type CustomResponse = Omit<Response, 'json'> & {
    json: () => Promise<{
        status: string
        message: string
    }>
}

export type Cookies = {
    token: string
}

export type UserContext = {
    firstName: string
    lastName: string
    email: string
    iss: string
    aud: string
    sub: string
    iat: number
    exp: number
}