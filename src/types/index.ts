export interface DBGetSchema {
    pk: string,
    sk?: string
    table: string
}

export interface DBPutSchema<T> {
    item: T
    table: string
}
