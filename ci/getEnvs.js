import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm'
import { writeFileSync } from 'fs'
import { isCI } from 'ci-info'

const createEnvFile = (parameters) => {
    let env = ''
    for (const param of parameters) {
        const name = param.Name.split('/')[2].replaceAll('-', '_').toUpperCase()
        if (isCI) {
            env += `echo "${name}=${param.Value}" >> $GITHUB_ENV\n`
        } else {
            env += `export ${name}="${param.Value}" \n`
        }
    }
    return env
}

const getEnvs = async () => {
    const stage = process.env.STAGE
    const region = process.env.AWS_LOCAL_REGION

    const client = new SSMClient({
        region
    })

    if (!stage) {
        throw new Error('$STAGE not defined')
    }

    const ssmParameters = [
        `/${stage}/aws-account-id`,
        `/${stage}/auth-issuer`,
        `/${stage}/auth-audience`,
        `/${stage}/auth-secret`,
    ]

    const command = new GetParametersCommand({
        Names: ssmParameters
    })

    const response = await client.send(command)
    const env = createEnvFile(response.Parameters)
    writeFileSync('.env', env)
}

getEnvs().catch((err) => {
    console.log('Could not get envs from SSM', err)
    process.exit(1)
})
