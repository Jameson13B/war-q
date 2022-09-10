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
  onSnapshot,
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
export const docRefById = (collectionName, id) => doc(db, collectionName, id)
// GET Helper Functions
export const getDocs = (collectionName, customQuery) =>
  query(collection(db, collectionName), where(...customQuery))
export const getFirebaseDoc = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  return docSnap
}
export const subcribeToDoc = (collectionName, id) =>
  onSnapshot(doc(db, collectionName, id), (doc) => {
    console.log('doc', doc.data())
  })
export const subcribeToDocs = (collectionName) => onSnapshot(collection(db, collectionName))

// Add Helper Functions
export const addUser = async (id, handle) =>
  await setDoc(doc(db, 'users', id), {
    handle,
    role: 'user',
    template: [],
  })
export const addBattle = async (userId) =>
  await addDoc(collection(db, 'battles'), {
    createdAt: serverTimestamp(),
    playerAId: userId,
    playerAReady: false,
    playerAQ: [],
    playerBId: null,
    playerBReady: false,
    playerBQ: [],
    playerCount: 1,
    winner: null,
    loser: null,
  })

// Update Helper Functions
export const updateUser = async (id, updatedFields) =>
  await updateDoc(doc(db, 'users', id), updatedFields)

export const updateUsersTemplate = async (id, template) =>
  await updateDoc(doc(db, 'users', id), { template })

export const updateBattle = async (battleId, userId) =>
  await updateDoc(doc(db, 'battles', battleId), {
    playerBId: userId,
    playerCount: 2,
  })
