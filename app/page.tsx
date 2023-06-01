import PassageLogin from '@/components/login'
import { getUserFromAuthToken } from '@/utils/auth-validator'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const authToken = cookies.get('psg_auth_token')?.value
  if (!authToken) return null

  return getUserFromAuthToken(authToken)
}

export default async function Home() {
  const userId = await getUserFromCookie(cookies())

  return (
    <>
      {userId ? (
        <div>Hello, {userId}!</div>
      ) : (
        <div>
          <PassageLogin />
        </div>
      )}
    </>
  )
}
