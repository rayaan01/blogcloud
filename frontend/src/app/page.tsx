import { isAuthorized } from "../auth/isAuthorized"
import { redirect } from 'next/navigation'

const Home = async () => {

  if (!isAuthorized()) {
    redirect('/login')
  }

  return (
    <h1>
      BlogCloud
    </h1>
  )
}

export default Home