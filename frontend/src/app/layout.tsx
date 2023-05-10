export const metadata = {
  title: 'BlogCloud',
}

export const RootLayout = ({
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
