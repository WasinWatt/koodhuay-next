import { Huay } from '@/types/huay'
import { Firestore } from 'firebase-admin/firestore'

export const getHuay = async (
  { firestore }: { firestore: Firestore },
  id: string
) => {
  const huay = await firestore.collection('huays').doc(id).get()
  return {
    ...(huay.data() as Huay),
    id: huay.id,
  }
}
