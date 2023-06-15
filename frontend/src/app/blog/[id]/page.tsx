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
        <div className='relative h-36 w-1/2 mb-14 p-4 bg-white hover:bg-gray-100 hover:cursor-pointer'>
            <h2 className='text-2xl text-blue-900'>{title}</h2>
            <div className='mt-2'>
                {content}
            </div>
        </div>
    )
}

export default Blog