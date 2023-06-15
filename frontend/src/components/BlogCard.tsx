import type { Blog } from '@/types'
import type { FC } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Link from 'next/link'

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, content, createdAt, sk } = blog
    dayjs.extend(localizedFormat)
    const formattedDate = dayjs(createdAt).format('LL')
    const path = `/blog/${sk.replace('BLOG#', '')}`

    return (
        <Link href={path} className='relative h-36 w-1/2 mb-14 p-4 bg-white hover:bg-gray-100 hover:cursor-pointer'>
            <h2 className='text-2xl text-blue-900'>{title}</h2>
            <span className='absolute left-[35rem] bottom-28 text-blue-400'>{formattedDate}</span>
            <div className='mt-2'>
                <span>
                    {content.substring(0, 200)}
                </span>
                <span>
                    {content.length > 200 && ' ...'}
                </span>
                <span className='text-green-700'>{content.length > 200 && ' (click to read more)'}</span>
            </div>
        </Link>       
    )
}

export default BlogCard