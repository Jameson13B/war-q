import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Parse from 'parse/dist/parse.min.js'

import { getCurrentUser } from '../index'

export const User = (props) => {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const styles = getStyles()

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user)
    })
  }, [])

  const handleLogin = async () => {
    try {
      const createUser = await Parse.User.logIn(loginUsername, loginPassword)
      alert(`Success! User ${createUser.getUsername()} was successfully logged in!`)

      const user = await getCurrentUser()
      setCurrentUser(user)
      setLoginUsername('')
      setLoginPassword('')
    } catch (error) {
      alert(`Error! ${error}`)
    }
  }
  const handleRegister = async () => {
    try {
      const createUser = await Parse.User.signUp(registerUsername, registerPassword)
      alert(`Success! User ${createUser.getUsername()} was successfully created!`)

      const user = await getCurrentUser()
      setCurrentUser(user)
      setRegisterUsername('')
      setRegisterPassword('')
    } catch (error) {
      alert(`Error! ${error}`)
    }
  }
  const handleLogout = async () => {
    try {
      await Parse.User.logOut()
      const currentUser = await Parse.User.current()
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!')
      }

      await getCurrentUser()
      setCurrentUser(null)
    } catch (error) {
      alert(`Error! ${error.message}`)
    }
  }
  const onLogin = (e) => {
    e.preventDefault()
    if (!loginUsername || !loginPassword) {
      return alert('Please enter a username and password!')
    }
    handleLogin()
  }
  const onRegister = (e) => {
    e.preventDefault()
    if (!registerUsername || !registerPassword) {
      return alert('Please enter a username and password!')
    }
    handleRegister()
  }

  return (
    <div style={styles.container}>
      {currentUser && (
        <div>
          <h2>Welcome {currentUser.attributes.username}</h2>
          <p style={styles.joinedLabel}>
            Joined {dayjs(currentUser.createdAt.toISOString()).fromNow()}
          </p>
          <button className="btn" onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      )}
      {!currentUser && (
        <React.Fragment>
          <div>
            <h1>Login</h1>
            <form autoComplete="off" onSubmit={onLogin}>
              <input
                name={Date.now()}
                onChange={(event) => setLoginUsername(event.target.value)}
                placeholder="Username"
                style={styles.input}
                value={loginUsername}
              />
              <input
                name={Date.now()}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Password"
                style={styles.input}
                value={loginPassword}
              />
              <button className="btn" style={styles.button} type="primary">
                Login
              </button>
            </form>
          </div>
          <hr style={styles.divider} />
          <div>
            <h1>Register</h1>
            <form autoComplete="off" onSubmit={onRegister}>
              <input
                name={Date.now()}
                onChange={(event) => setRegisterUsername(event.target.value)}
                placeholder="Username"
                style={styles.input}
                value={registerUsername}
              />
              <input
                name={Date.now()}
                onChange={(event) => setRegisterPassword(event.target.value)}
                placeholder="Password"
                style={styles.input}
                value={registerPassword}
              />
              <button className="btn" style={styles.button} type="primary">
                Register
              </button>
            </form>
          </div>
        </React.Fragment>
      )}
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
