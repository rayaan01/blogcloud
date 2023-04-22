export const httpResponses: Record<string, string> = {
    200: JSON.stringify({ status: 'success' }),
    400: JSON.stringify({ status: 'error', message: 'Invalid Request' }),
    500: JSON.stringify({ status: 'error', message: 'Something went wrong' })
}
