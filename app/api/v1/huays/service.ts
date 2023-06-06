import { Huay } from '@/types/huay'
import { Firestore } from 'firebase-admin/firestore'
import { HuayRequestBody } from './route'

export const createHuay = async (
  { firestore }: { firestore: Firestore },
  userId: string,
  huay: HuayRequestBody
) => {
  const { id } = await firestore
    .collection('huays')
    .add({ ...huay, userId, likes: 0, createdAt: Date.now() })

  return {
    ...huay,
    likes: 0,
    userId,
    id,
  }
}

export const getHuays = async (
  { firestore }: { firestore: Firestore },
  sortBy: string
) => {
  const huays = await firestore
    .collection('huays')
    .orderBy(sortBy, 'desc')
    .limitToLast(25)
    .get()

  return huays.docs.map((huay) => ({
    ...(huay.data() as Huay),
    id: huay.id,
  }))
}
