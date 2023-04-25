export const httpResponses: Record<string, string> = {
    200: JSON.stringify({ status: 'success' }),
    400: JSON.stringify({ status: 'error', message: 'Invalid Request' }),
    401: JSON.stringify({ status: 'error', message: 'Unauthorized' }),
    422: JSON.stringify({ status: 'error', message: 'User already exists' }),
    500: JSON.stringify({ status: 'error', message: 'Something went wrong' })
}
