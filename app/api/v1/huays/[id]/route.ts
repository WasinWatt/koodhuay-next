import firestore from '@/utils/firebase-admin'
import { getHuay } from './service'
import handle from '@/utils/route-error-handler'
import { NextResponse } from 'next/server'
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
) {
  const id = params.id
  try {
    const huay = await getHuay({ firestore }, id)
    return NextResponse.json({ huay })
  } catch (error) {
    return handle(error)
  }
}
