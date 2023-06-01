import { serverUnavailable } from '@hapi/boom'
import { JWK } from 'jose'
import { decodeProtectedHeader, importJWK, jwtVerify } from 'jose'

interface JWKS {
  [key: string]: JWK
}

let APP_JWKS: JWKS | null = null

const fetchJWKS = async (resetCache?: boolean): Promise<JWKS> => {
  // use cached value if found
  if (APP_JWKS && !resetCache) {
    return APP_JWKS
  }

  try {
    const res = await fetch(
      `https://auth.passage.id/v1/apps/${process.env.NEXT_PUBLIC_PASSAGE_APP_ID}/.well-known/jwks.json`
    )
    const jwks = await res.json()
    const formattedJWKS: JWKS = {}

    // format jwks for cache
    for (const jwk of jwks.keys) {
      formattedJWKS[jwk.kid] = jwk
    }

    APP_JWKS = formattedJWKS
    return formattedJWKS
  } catch (error) {
    throw serverUnavailable('Unable to fetch JWKS')
  }
}

const findJWK = async (kid: string): Promise<JWK | null> => {
  let jwk = null
  if (APP_JWKS) {
    jwk = APP_JWKS[kid]
    if (jwk) {
      return jwk
    }

    await fetchJWKS(true)
    jwk = APP_JWKS[kid]
    if (jwk) {
      return jwk
    }
    return null
  } else {
    await fetchJWKS(true)
    jwk = APP_JWKS ? APP_JWKS[kid] : null
    if (jwk) {
      return jwk
    }
    return null
  }
}

export const getUserFromAuthToken = async (
  token: string
): Promise<string | null> => {
  try {
    const { kid } = decodeProtectedHeader(token)
    if (!kid) {
      return null
    }

    const jwk = await findJWK(kid)
    if (!jwk) {
      return null
    }

    const key = await importJWK(jwk)
    const {
      payload: { sub: userID },
    } = await jwtVerify(token, key, {
      algorithms: [jwk.alg as string],
    })
    if (userID) return userID.toString()
    else return null
  } catch (e) {
    console.log(e)
    return null
  }
}
