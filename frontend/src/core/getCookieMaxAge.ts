export const getCookieMaxAge = (): number => {
    const date = new Date()
    return Math.ceil(new Date(date.setMonth(date.getMonth() + 1)).getTime() / 1000)
}