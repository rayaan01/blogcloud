export interface PkSkSchema {
    pk: string,
    sk?: string
    table: string
}

export interface UserSchema {
    pk: string,
    email: string,
    password: string,
    created_at: string
}