import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, generateCaptcha, signIn, signOut } from '../Firebase'
import dayjs from 'dayjs'

export const User = (props) => {
  const [user] = useAuthState(auth)
  const [showOtp, setShowOtp] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const styles = getStyles()

  useEffect(() => {
    generateCaptcha()
  }, [])

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
      .then((user) => {
        setOtpValue('')
        setShowOtp(null)
      })
      .catch((err) => console.log('err2', err))
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut()
  }

  if (showOtp) {
    return (
      <div style={styles.container}>
        <h1>Enter code we sent you.</h1>
        <form autoComplete="off" onSubmit={handleOtp}>
          <input
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
          <h2>Welcome {user.phoneNumber}</h2>
          <p style={styles.joinedLabel}>Joined {dayjs(user.metadata.creationTime).fromNow()}</p>
          <button className="btn" onClick={handleLogout} style={styles.button}>
            Logout
          </button>
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
  joinedLabel: {
    marginBottom: 10,
    fontStyle: 'italic',
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
