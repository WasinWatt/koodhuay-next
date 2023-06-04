import { Huay } from '@/types/huay'
import { Firestore } from 'firebase-admin/firestore'

export const createHuay = async (
  { firestore }: { firestore: Firestore },
  huay: Huay
) => {
  const { id } = await firestore
    .collection('huays')
    .add({ ...huay, likes: 0, createdAt: Date.now() })

  return {
    ...huay,
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
