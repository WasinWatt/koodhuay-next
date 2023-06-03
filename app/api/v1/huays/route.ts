import { NextRequest, NextResponse } from 'next/server'
import handle from '@/utils/route-error-handler'
import firestore from '@/utils/firebase-admin'
import { createHuay, getHuays } from './service'
import { Huay } from '@/types/huay'

export async function POST(request: NextRequest) {
  try {
    const huay: Huay = await request.json()
    const dbHuay = await createHuay({ firestore }, huay)
    return NextResponse.json({ huay: dbHuay })
  } catch (error) {
    return handle(error)
  }
}

export async function GET() {
  try {
    const huays: Huay[] = await getHuays({ firestore })
    return NextResponse.json({ huays })
  } catch (error) {
    return handle(error)
  }
}
