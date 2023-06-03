import { Huay } from '@/types/huay'
import { Firestore } from 'firebase-admin/firestore'

export const createHuay = async (
  { firestore }: { firestore: Firestore },
  huay: Huay
) => {
  const { id } = await firestore
    .collection('huays')
    .add({ ...huay, createdAt: Date.now() })

  return {
    ...huay,
    id,
  }
}

export const getHuays = async ({ firestore }: { firestore: Firestore }) => {
  const huays = await firestore
    .collection('huays')
    .orderBy('createdAt', 'desc')
    .limitToLast(50)
    .get()

  return huays.docs.map((huay) => ({
    ...(huay.data() as Huay),
    id: huay.id,
  }))
}
