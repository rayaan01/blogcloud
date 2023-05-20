import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { FC } from 'react'

export const metadata = {
  title: 'BlogCloud'
}

const RootLayout: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout