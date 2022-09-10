// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  // onSnapshot,
  query,
  setDoc,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCjiUQ7Wavc3tdglkyG0C7Sd2wGkn0oJUo',
  authDomain: 'space-race-f07ed.firebaseapp.com',
  projectId: 'space-race-f07ed',
  storageBucket: 'space-race-f07ed.appspot.com',
  messagingSenderId: '356937559178',
  appId: '1:356937559178:web:cc6c2dcb8295af04385173',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

/**
 * Firestore Auth Service
 */
export const auth = getAuth(app)
export const FirestoreAuth = {
  generateCaptcha: () => {
    window.captcha = new RecaptchaVerifier(
      'captcha-button',
      {
        size: 'invisible',
      },
      auth,
    )
  },
  signIn: (phoneNumber) => signInWithPhoneNumber(auth, `+${phoneNumber}`, window.captcha),
  signOut: () => firebaseSignOut(auth),
}

/**
 * Firestore Databse Service
 */
export const db = getFirestore(app)
export const docRefById = (collectionName, id) => doc(db, collectionName, id)

export const FirestoreDB = {
  addBattle: async (userId) => {
    return await getDoc(doc(db, 'users', userId)).then(async (doc) => {
      return await addDoc(collection(db, 'battles'), {
        createdAt: serverTimestamp(),
        playerAId: userId,
        playerAReady: false,
        playerAQ: doc.get('template'),
        playerBId: null,
        playerBReady: false,
        playerBQ: [],
        playerCount: 1,
        winner: null,
        loser: null,
      })
    })
  },
  addUser: async (id, handle) =>
    await setDoc(doc(db, 'users', id), {
      handle,
      role: 'user',
      template: [],
    }),
  getDoc: async (collectionName, id) => await getDoc(doc(db, collectionName, id)),
  getDocs: (collectionName, customQuery) =>
    query(collection(db, collectionName), where(...customQuery)),
  // subcribeToDoc: (collectionName, id) =>
  //   onSnapshot(doc(db, collectionName, id), (snapshot) => snapshot),
  // subcribeToDocs: (collectionName) =>
  //   onSnapshot(collection(db, collectionName), (snapshot) => snapshot),
  updateBattle: async (battleId, userId) =>
    await updateDoc(doc(db, 'battles', battleId), {
      playerBId: userId,
      playerCount: 2,
    }),
  updateUser: async (id, updatedFields) => await updateDoc(doc(db, 'users', id), updatedFields),
  updateUsersTemplate: async (id, template) => await updateDoc(doc(db, 'users', id), { template }),
}
