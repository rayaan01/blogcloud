import NavBar from '@/components/NavBar'
import { getUserFromCookie } from '@/core/getUserFromCookie'
import { getBlog } from '@/server/getBlog'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Blog = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
    const cookie = headers().get('cookie')
    if (!cookie) {
        redirect('/login')
    }
    const { id } = params
    const blog = await getBlog(id)
    const user = getUserFromCookie(cookie)

    if (!blog) {
        redirect('/home')
    }

    const { title, content, createdAt } = blog
    dayjs.extend(localizedFormat)
    const formattedDate = dayjs(createdAt).format('LL')

    return (
        <div className='h-screen bg-gray-300'>
            <NavBar user={user}/>
            <div className='flex justify-center items-start h-screen w-screen bg-slate-300'>
                <div className='relative flex flex-col justify-start items-center w-2/3 pt-8 pb-8 pr-12 pl-12 mt-20 bg-white'>
                    <h2 className='text-4xl text-blue-900'>{title}</h2>
                    <div className='mt-14 text-xl'>
                        {content}
                    </div>
                    <span className='absolute right-2 top-2 text-blue-500'>Posted on {formattedDate}</span>
                </div>
            </div>
        </div>
    )
}

export default Blog