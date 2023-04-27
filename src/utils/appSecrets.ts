const appEnv = process.env.STAGE ?? ''

export const appSecrets = {
    stage: appEnv,
    blogsTable: `${appEnv}-blogs-table`,
    usersTable: `${appEnv}-users-table`,
    apiGatewayName: `${appEnv}-blogs-api`,
    region: process.env.AWS_REGION ?? '',
    account: process.env.AWS_ACCOUNT_ID ?? '',
    issuer: process.env.AUTH_ISSUER ?? '',
    audience: process.env.AUTH_AUDIENCE ?? '',
    authSecret: process.env.AUTH_SECRET ?? ''
}