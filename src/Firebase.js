// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import {
  getDoc,
  getFirestore,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
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

// Auth
export const auth = getAuth(app)
export const generateCaptcha = () => {
  window.captcha = new RecaptchaVerifier(
    'captcha-button',
    {
      size: 'invisible',
    },
    auth,
  )
}
export const signIn = (phoneNumber) =>
  signInWithPhoneNumber(auth, `+${phoneNumber}`, window.captcha)
export const signOut = () => firebaseSignOut(auth)

// Firestore/DB
export const db = getFirestore(app)
export const getDocs = (collectionName, customQuery) =>
  query(collection(db, collectionName), where(...customQuery))
export const getFirebaseDoc = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  return docSnap
}
export const docRefById = (collectionName, id) => doc(db, collectionName, id)
export const subcribeToDoc = (collectionName, id) =>
  onSnapshot(doc(db, collectionName, id), (doc) => {
    console.log('doc', doc.data())
  })
// const unsub = onSnapshot(doc(db, 'cities', 'SF'), (doc) => {
//   console.log('Current data: ', doc.data())
// })

// DB Helper Functions
export const addUser = async (id, handle) =>
  await setDoc(doc(db, 'users', id), {
    handle,
    role: 'user',
    template: [],
  })

export const updateUser = async (id, updatedFields) =>
  await updateDoc(doc(db, 'users', id), updatedFields)

export const updateUsersTemplate = async (id, template) =>
  await updateDoc(doc(db, 'users', id), { template })
