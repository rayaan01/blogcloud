'use client'

import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { useEffect } from 'react'
import { serialize } from 'cookie'

const Logout: FC = () => {
    useEffect(() => {
        document.cookie = serialize('token', '', {
            maxAge: new Date(-1).getTime()
        })
        redirect('/login')
    }, [])

    return (
        <div>
            Logging you out
        </div>
    )
}

export default Logout