import type { Blog } from '@/types'
import type { FC } from 'react'

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, content } = blog
    return (
        <div className='h-36 w-1/2 mb-14 p-4 bg-white hover:bg-gray-100 hover:cursor-pointer'>
            <h2 className='text-2xl text-blue-900'>{title}</h2>
            <div className='mt-2'>
                <span>
                    {content.substring(0, 200)}
                </span>
                <span>
                    {content.length > 200 && ' ...'}
                </span>
                <span className='text-green-700'>{content.length > 200 && ' (click to read more)'}</span>
            </div>
        </div>
    )
}

export default BlogCard