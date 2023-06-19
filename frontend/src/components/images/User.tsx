import Image from 'next/image'
import UserComponent from '../../../public/user.svg'

export const User = <Image 
    src={UserComponent} 
    alt="User" 
    width={75}
    height={75} 
    className="inline mr-2" 
    />
