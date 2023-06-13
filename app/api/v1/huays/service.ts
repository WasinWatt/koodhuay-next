import { Huay } from '@/types/huay'
import { Firestore } from 'firebase-admin/firestore'
import { HuayRequestBody } from './route'

export const createHuay = async (
  { firestore }: { firestore: Firestore },
  huay: HuayRequestBody
) => {
  const { id } = await firestore
    .collection('huays')
    .add({ ...huay, likes: 0, createdAt: Date.now() })

  return {
    ...huay,
    likes: 0,
    id,
  }
}

export const getHuays = async (
  { firestore }: { firestore: Firestore },
  { sortBy, lastId }: { sortBy: string; lastId: string | null }
) => {
  let lastHuay
  if (lastId) {
    lastHuay = await firestore.collection('huays').doc(lastId).get()
    if (!lastHuay.exists) {
      throw new Error('Invalid lastId')
    }
  }

  const query = lastHuay
    ? firestore.collection('huays').orderBy(sortBy, 'desc').startAfter(lastHuay)
    : firestore.collection('huays').orderBy(sortBy, 'desc')
  const huays = await query.limit(20).get()

  return huays.docs.map((huay) => ({
    ...(huay.data() as Huay),
    id: huay.id,
  }))
}
