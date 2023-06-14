import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import { getUserBlogs } from './server/getUserBlogs'
import BlogCard from '@/components/BlogCard'

const Home = async (): Promise<JSX.Element> => {
    const cookie = headers().get('cookie')
    if (!cookie) {
        redirect('/login')
    }
    const user = getUserFromCookie(cookie)
    const blogs = await getUserBlogs(cookie)

    return (
        <div className='h-screen bg-gray-300'>
           <NavBar user={user}/>
            {
                blogs.length === 0 ? 
                (
                    <div className='w-full bg-slate-100 pt-2 pb-2 pl-8 pr-8'>
                        <span className='text-lg'>You have no posts yet!</span>
                        <Link href='/blog' className='text-lg ml-2 text-blue-500'>Create one</Link>
                    </div>
                ) : 
                (
                    <div className='flex flex-col items-center w-full h-[93%] pt-14 pb-14 pl-16 pr-16'>
                        { blogs.map((blog, index) => <BlogCard key={index} blog={blog}/>) }
                    </div>
                )
            }
        </div>
    )
}

export default Home