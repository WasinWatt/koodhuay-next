import App from './app'
import { cookies } from 'next/headers'
import axios from '@/utils/axios'
import { getUserFromCookie } from '@/utils/auth-validator'

export default async function Home() {
  const userId = await getUserFromCookie(cookies())
  const {
    data: { huays },
  } = await axios.get('/api/v1/huays?sortBy=likes')

  return <App userId={userId} huays={huays} />
}
