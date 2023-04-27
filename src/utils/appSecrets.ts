const appEnv = process.env.APP_ENV ?? ''

export const appSecrets = {
    stage: appEnv,
    blogsTable: `${appEnv}-blogs-table`,
    usersTable: `${appEnv}-users-table`,
    apiGatewayName: `${appEnv}-blogs-api`,
    region: process.env.AWS_LOCAL_REGION ?? '',
    account: process.env.AWS_ACCOUNT_ID ?? '',
    issuer: process.env.AUTH_ISSUER ?? '',
    audience: process.env.AUTH_AUDIENCE ?? '',
    authSecret: process.env.AUTH_SECRET ?? ''
}