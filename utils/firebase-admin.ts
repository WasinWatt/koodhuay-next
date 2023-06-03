import { initializeApp, cert, App, getApps } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

let app: App | undefined = getApps()[0]

if (!app) {
  app = initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '')),
  })
}

const firestore: Firestore = getFirestore(app)

export default firestore
