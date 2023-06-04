import firestore from '@/utils/firebase-admin'
import handle from '@/utils/route-error-handler'
import { NextResponse } from 'next/server'
import { likeHuay } from './service'
export async function POST(
  _request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
) {
  const id = params.id
  try {
    await likeHuay({ firestore }, id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handle(error)
  }
}
