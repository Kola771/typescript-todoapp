import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

// initialize firebase
const app = initializeApp(firebaseConfig)

// Initialiser le service d'authentification et récupérer le service
const auth = getAuth(app)

// Initilaiser cloud Firestore (la DB en temps réel) et récupérer le service
const db = getFirestore(app)

export { auth, db }