import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDCC4R2_Ut1DS32-zhIGiQjmz7SJbJ5SQ0',
  authDomain: 'wikrama-2.firebaseapp.com',
  projectId: 'wikrama-2',
  storageBucket: 'wikrama-2.firebasestorage.app',
  messagingSenderId: '742304655046',
  appId: '1:742304655046:web:4bfce00948861f5f5499c7',
  measurementId: 'G-K1D39BKWNN',
}

export const ADMIN_FIREBASE_EMAIL = 'admin@smkwikrama.sch.id'
export const ADMIN_FIREBASE_PASSWORD = 'pakrizkiwikrama2'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
