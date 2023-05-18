export const createCookie = ({
    key,
    value,
}: {
    key: string,
    value: string,
}): string => {
    // Set default expiry of 1 month
    const date = new Date()
    const maxAge = Math.ceil(new Date(date.setMonth(date.getMonth() + 1)).getTime() / 1000)
    return `${key}=${value}; Path=/; SameSite=Strict; Secure; max-age=${maxAge}`
}