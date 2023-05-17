export type CustomResponse = Omit<Response, 'json'> & {
    json: () => Promise<{
        status: string
        message?: string
    }>
}