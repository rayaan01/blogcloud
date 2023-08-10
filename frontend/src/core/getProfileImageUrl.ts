export const getProfileImageUrl = (email: string): string => {
    const domain = process.env.NEXT_PUBLIC_S3_URL
    const path = encodeURIComponent(`USER#${email}.jpg`)
    const url = new URL(path, domain)
    return url.href
}