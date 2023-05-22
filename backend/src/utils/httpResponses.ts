export const httpResponses: Record<string, string> = {
    200: JSON.stringify({ status: 'success', message: 'ok' }),
    400: JSON.stringify({ status: 'error', message: 'Invalid Arguments' }),
    401: JSON.stringify({ status: 'error', message: 'Unauthorized' }),
    403: JSON.stringify({ status: 'error', message: 'Forbidden' }),
    404: JSON.stringify({ status: 'error', message: 'Not found' }),
    422: JSON.stringify({ status: 'error', message: 'User already exists' }),
    500: JSON.stringify({ status: 'error', message: 'Something went wrong' })
}
