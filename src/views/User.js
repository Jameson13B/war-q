import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, FirebaseAuth, FirestoreDB } from '../Firebase'
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
    FirebaseAuth.generateCaptcha()
  }, [user])

  useEffect(() => {
    if (!user) return () => {}

    const unsub = FirestoreDB.subscribeToDoc('users', user.uid, (doc) =>
      setUserDetails({ id: doc.id, ...doc.data() }),
    )

    return () => unsub()
  }, [user])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!phoneNumber) {
      return alert('Please enter your phone number.')
    }
    FirebaseAuth.signIn(phoneNumber)
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
        FirestoreDB.getDoc('users', user.uid).then((snapshot) => {
          if (!snapshot.exists()) {
            FirestoreDB.addUser(user.uid, user.phoneNumber).then(() => console.log('successful'))
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
          <p>You can use the form below to create a re-usable template.</p>
          <h4>
            <strong>W/L Ratio:</strong> *Coming Soon*
          </h4>
          <hr />
          <hr />
          <Builder
            buttonText="Save"
            handleReadyClick={(template) => {
              alert('Save template')
              FirestoreDB.updateUsersTemplate(user.uid, template)
                .then((res) => alert('Template saved!'))
                .catch((err) => console.log(err))
            }}
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
