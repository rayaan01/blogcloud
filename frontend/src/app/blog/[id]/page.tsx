import { getBlog } from '@/server/getBlog'
import { redirect } from 'next/navigation'

const Blog = async ({ params }: {params: { id: string }}): Promise<JSX.Element> => {
    const { id } = params
    const blog = await getBlog(id)

    if (!blog) {
        redirect('/home')
    }

    const { title, content } = blog

    return (
        <div className='flex justify-center items-start h-screen w-screen bg-slate-300 mt-20'>
            <div className='flex flex-col justify-start items-center h-1/2 w-3/4 p-8 bg-white'>
                <h2 className='text-4xl text-blue-900'>{title}</h2>
                <div className='mt-4'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Blog