import Image from 'next/image'
import UserComponent from '../../../public/user.svg'

export const User = <Image 
    src={UserComponent} 
    alt="User" 
    width={50}
    height={50} 
    className="inline mr-2" 
    />
