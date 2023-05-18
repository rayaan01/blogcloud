import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'BlogCloud',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
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