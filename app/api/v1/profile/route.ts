import passage from '@/utils/passage';
import { unauthorized } from '@hapi/boom';
import { NextRequest, NextResponse } from 'next/server'
import handle from '@/app/api/error-handler';
import { cookies } from 'next/headers'

const getAuthenticatedUserFromSession = async (request: Request) : Promise<string> => {
  try {
    const userId = await passage.authenticateRequest(request);
    if (userId) {
      return userId;
    }

    throw unauthorized('unauthorized')
  } catch (error) {
    throw unauthorized('unauthorized')
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log(request.cookies)
    const userId = await getAuthenticatedUserFromSession(request)
    return NextResponse.json({ userId })
  } catch (error) {
    return handle(error)
  }
}