import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
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

  return (
    <div style={styles.container}>
      {currentUser && (
        <div>
          <h2>Welcome {currentUser.attributes.username}</h2>
          <p style={styles.joinedLabel}>
            Joined {dayjs(currentUser.createdAt.toISOString()).fromNow()}
          </p>
          <Button onClick={handleLogout} style={styles.button}>
            Logout
          </Button>
        </div>
      )}
      {!currentUser && (
        <React.Fragment>
          <div>
            <h1>Login</h1>
            <form autoComplete="off">
              <Input
                name={Date.now()}
                onChange={(event) => setLoginUsername(event.target.value)}
                placeholder="Username"
                size="large"
                style={styles.input}
                value={loginUsername}
              />
              <Input
                name={Date.now()}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Password"
                size="large"
                style={styles.input}
                value={loginPassword}
              />
              <Button onClick={handleLogin} style={styles.button} type="primary">
                Login
              </Button>
            </form>
          </div>
          <hr style={styles.divider} />
          <div>
            <h1>Register</h1>
            <form autoComplete="off">
              <Input
                name={Date.now()}
                onChange={(event) => setRegisterUsername(event.target.value)}
                placeholder="Username"
                size="large"
                style={styles.input}
                value={registerUsername}
              />
              <Input
                name={Date.now()}
                onChange={(event) => setRegisterPassword(event.target.value)}
                placeholder="Password"
                size="large"
                style={styles.input}
                // type="password"
                value={registerPassword}
              />
              <Button onClick={handleRegister} style={styles.button} type="primary">
                Register
              </Button>
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
  },
  button: {
    width: '100%',
  },
  divider: {
    margin: '20px 0',
  },
})
