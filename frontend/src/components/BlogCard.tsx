import type { Blog } from '@/types'
import type { FC } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Link from 'next/link'
import Image from 'next/image'
import { getProfileImageUrl } from '@/core/getProfileImageUrl'

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, content, createdAt, sk, pk } = blog
    dayjs.extend(localizedFormat)
    const formattedDate = dayjs(createdAt).format('LL')
    const userId = pk.replace('USER#', '')
    const profileImage = getProfileImageUrl(userId)
    const blogId = sk.replace('BLOG#', '')
    const path = `/blog/${blogId}`

    return (
        <Link href={path} className='relative h-36 w-1/2 mb-14 p-4 bg-white hover:bg-gray-100 hover:cursor-pointer'>
            <h2 className='text-2xl text-blue-900'>{title}</h2>
            <span className='absolute right-3 top-2 text-blue-500'>{formattedDate}</span>
            <Image 
                src={profileImage}
                width={32} 
                height={32} 
                alt="Profile" 
                className="absolute right-1 bottom-1 mr-2 rounded-[100%]" 
            />
            <div className='mt-2'>
                <span>
                    {content.substring(0, 200) && content.length > 200 && ' ...'}
                </span>
                <span className='text-green-700'>
                    {content.length > 200 && ' (click to read more)'}
                </span>
            </div>
        </Link>
    )
}

export default BlogCard