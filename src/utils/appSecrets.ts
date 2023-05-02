const validateEnv = (key: string): string => {
    if (!process.env[key]) {
        throw new Error(`Environment Variable "${key}" is not set`)
    }

    return process.env[key] as string
}

const appEnv = validateEnv('STAGE')

export const appSecrets = {
    stage: appEnv,
    mainTable: `${appEnv}-main-table`,
    apiGatewayName: `${appEnv}-blogs-api`,
    region: validateEnv('AWS_LOCAL_REGION'),
    account: validateEnv('AWS_ACCOUNT_ID'),
    issuer: validateEnv('AUTH_ISSUER'),
    audience: validateEnv('AUTH_AUDIENCE'),
    authSecret: validateEnv('AUTH_SECRET')
}