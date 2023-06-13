import Image from 'next/image'
import SpinnerComponent from '../../../public/spinner.svg'

export const spinner = <Image 
    src={SpinnerComponent} 
    alt="Loading Spinner" 
    width={25} 
    height={25} 
    className="inline mr-2" 
    />
