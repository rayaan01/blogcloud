import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { FC } from 'react'

const Blog: FC = () => {
    const cookie = headers().get('cookie')
    if (!cookie) {
        redirect('/login')
    }
    const user = getUserFromCookie(cookie)
    
    return (
        <div className='h-screen bg-gray-300'>
            <NavBar user={user}/>
            <div>Hello</div>
        </div>
    )
}

export default Blog