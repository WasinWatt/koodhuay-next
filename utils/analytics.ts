import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBoY9oOWgMDmXr0xy-K-XD0NzG615tL1Bk',
  authDomain: 'koodhuay-prod.firebaseapp.com',
  projectId: 'koodhuay-prod',
  storageBucket: 'koodhuay-prod.appspot.com',
  messagingSenderId: '912964390417',
  appId: '1:912964390417:web:01e13606ed11fec336ebb0',
  measurementId: 'G-0KH76Y345S',
}

let app = getApps()[0]

if (!app) {
  app = initializeApp(firebaseConfig)
}

const analytics = getAnalytics(app)

export default analytics
