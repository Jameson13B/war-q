import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import {
  addUser,
  auth,
  db,
  generateCaptcha,
  getFirebaseDoc,
  signIn,
  updateUsersTemplate,
} from '../Firebase'
import { Builder } from './Builder'
import dayjs from 'dayjs'

export const User = (props) => {
  const [user] = useAuthState(auth)
  const [userDetails, setUserDetails] = useState(null)
  const [showOtp, setShowOtp] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const styles = getStyles()

  useEffect(() => {
    generateCaptcha()
  }, [user])

  useEffect(() => {
    if (!user) return () => {}

    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) =>
      setUserDetails({ id: doc.id, ...doc.data() }),
    )

    return () => unsub()
  }, [user])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!phoneNumber) {
      return alert('Please enter your phone number.')
    }
    signIn(phoneNumber)
      .then((results) => {
        setPhoneNumber('')
        setShowOtp(results)
      })
      .catch((err) => console.log('err1', err))
  }

  const handleOtp = (e) => {
    e.preventDefault()
    if (otpValue.length !== 6) {
      return alert('Please enter the value we sent you.')
    }
    showOtp
      .confirm(otpValue)
      .then(({ user }) => {
        getFirebaseDoc('users', user.uid).then((snapshot) => {
          if (!snapshot.exists()) {
            addUser(user.uid, user.phoneNumber).then(() => console.log('successful'))
          }
        })
        setOtpValue('')
        setShowOtp(null)
      })
      .catch((err) => console.log('err2', err))
  }

  if (showOtp) {
    return (
      <div style={styles.container}>
        <h1>Enter code we sent you.</h1>
        <form autoComplete="off" onSubmit={handleOtp}>
          <input
            autoFocus={showOtp}
            onChange={(event) => setOtpValue(event.target.value)}
            placeholder="Password"
            style={styles.input}
            value={otpValue}
          />
          <button className="btn" style={styles.button} type="primary">
            Verify Code
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {user && (
        <div>
          <h2 style={styles.title}>Welcome {userDetails?.handle ?? user.phoneNumber.slice(2)}</h2>
          <p style={styles.joinedLabel}>Joined {dayjs(user.metadata.creationTime).fromNow()}</p>
          <p>
            This area will have more details about your user/profile. You will be able to use the
            form below to create a re-usable template.
          </p>
          <hr />
          <hr />
          <Builder
            buttonText="Save"
            handleReadyClick={(template) => {
              alert('Save template')
              updateUsersTemplate(user.uid, template)
                .then((res) => alert('Template saved!'))
                .catch((err) => console.log(err))
            }}
            // title="Build your template"
          />
        </div>
      )}
      {!user && (
        <div>
          <h1>Login</h1>
          <form autoComplete="off" onSubmit={handleLogin}>
            <input
              onChange={(event) => {
                event.preventDefault()
                setPhoneNumber(event.target.value)
              }}
              placeholder="Phone number"
              style={styles.input}
              value={phoneNumber}
            />
            <button className="btn" id="sign-in-button" style={styles.button} type="primary">
              Send Login Code
            </button>
          </form>
        </div>
      )}
      <div id="captcha-button" />
    </div>
  )
}

const getStyles = () => ({
  container: {},
  title: {
    fontSize: '1.5em',
  },
  joinedLabel: {
    fontSize: '.8rem',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: '100%',
  },
  divider: {
    margin: '20px 0',
  },
})
