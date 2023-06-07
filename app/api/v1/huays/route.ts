import { NextRequest, NextResponse } from 'next/server'
import handle from '@/utils/route-error-handler'
import firestore from '@/utils/firebase-admin'
import { createHuay, getHuays } from './service'
import { Huay } from '@/types/huay'
import { getUserFromCookie } from '@/utils/auth-validator'
import { cookies } from 'next/headers'
import { unauthorized } from '@hapi/boom'

export interface HuayRequestBody {
  number: string
  description: string
  won: boolean
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromCookie(cookies())
    console.log('userId', userId)
    if (!userId) {
      throw unauthorized()
    }
    const huay: HuayRequestBody = await request.json()
    const dbHuay = await createHuay({ firestore }, userId, huay)
    return NextResponse.json({ huay: dbHuay })
  } catch (error) {
    return handle(error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const sortBy = request.nextUrl.searchParams.get('sortBy') || 'likes'
    const lastId = request.nextUrl.searchParams.get('lastId')
    const huays: Huay[] = await getHuays({ firestore }, { sortBy, lastId })
    return NextResponse.json({ huays })
  } catch (error) {
    return handle(error)
  }
}
