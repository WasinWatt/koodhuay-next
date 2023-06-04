import { FieldValue, Firestore } from 'firebase-admin/firestore'

export const likeHuay = (
  { firestore }: { firestore: Firestore },
  id: string
) => {
  return firestore
    .collection('huays')
    .doc(id)
    .update({ likes: FieldValue.increment(1) })
}
