export const appSecrets = {
    blogsTable: process.env.BLOGS_TABLE_NAME ?? '',
    usersTable: process.env.USERS_TABLE_NAME ?? '',
    region: process.env.AWS_LOCAL_REGION ?? '',
    account: process.env.AWS_ACCOUNT_ID ?? '',
    issuer: process.env.AUTH_ISSUER ?? '',
    audience: process.env.AUTH_AUDIENCE ?? '',
    authSecret: process.env.AUTH_SECRET ?? ''
}