export interface DBGetSchema {
    pk: string,
    sk?: string
    table: string
}

export interface DBPutSchema {
    item: Record<string, unknown>
    table: string
}

export interface UserSchema {
    pk: string,
    email: string,
    password: string,
    created_at: string
}