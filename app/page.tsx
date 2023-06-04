import { getUserFromAuthToken } from '@/utils/auth-validator'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import App from './app'
import { cookies } from 'next/headers'
import axios from '@/utils/axios'

const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const authToken = cookies.get('psg_auth_token')?.value
  if (!authToken) return null

  return getUserFromAuthToken(authToken)
}

export default async function Home() {
  const userId = await getUserFromCookie(cookies())
  const {
    data: { huays },
  } = await axios.get('/api/v1/huays?sortBy=likes')

  return <App userId={userId} huays={huays} />
}
