export interface DBGetSchema {
    pk: string,
    sk?: string
    table: string
}

export interface DBPutSchema<T> {
    item: T
    table: string
}

export interface UserSchema {
    pk: string,
    email: string,
    firstName: string,
    lastName: string,
    name: string,
    uid: string,
    password: string,
    created_at: string
    updated_at: string
}
