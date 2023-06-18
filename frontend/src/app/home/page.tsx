import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import { getUserBlogs } from '../../server/getUserBlogs'
import BlogCard from '@/components/BlogCard'
import { create } from '@/components/Create'

const Home = async (): Promise<JSX.Element> => {
    const cookie = headers().get('cookie')
    if (!cookie) {
        redirect('/login')
    }
    const user = getUserFromCookie(cookie)
    const blogs = await getUserBlogs(cookie)

    return (
        <div className='relative h-screen bg-gray-300'>
           <NavBar user={user}/>
           <div className='flex flex-col justify-center items-center absolute w-1/6 h-1/6 bg-gray-300 shadow-md'>
                <Link href='/blog' className='flex justify-center items-center'>
                    <span>{create}</span>
                    <span className='text-2xl text-blue-900'>Create a post</span>
                </Link>
           </div>
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
                        { blogs.map((blog) => <BlogCard key={blog.sk.replace('BLOG#', '')} blog={blog}/>) }
                    </div>
                )
            }
        </div>
    )
}

export default Home