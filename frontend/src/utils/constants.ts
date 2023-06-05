export const AUTH_COOKIE = 'token'

export const enum TOAST_MESSAGES {
    LOGIN_TOAST = 'Login failed. Invalid credentials',
    SIGNUP_TOAST = 'Signup failed. Something went wrong',
    ACCOUNT_EXISTS_TOAST = 'Signup failed. Account already exists',
    EMAIL_TOAST = 'Email is invalid',
    FIRST_NAME_TOAST = 'First name can contain only alphabets',
    LAST_NAME_TOAST = 'Last name can contain only alphabets',
    PASSWORD_TOAST = `Password must contain at least
        - 5 characters
        - 1 uppercase letter
        - 1 digit
        - 1 special character
        `,
    SOMETHING_WENT_WRONG = 'Something went wrong. Please try again',
    UPDATE_TOAST = 'Could not update details',
    UPDATE_TOAST_SUCCESS = 'Updated details successfully'
}