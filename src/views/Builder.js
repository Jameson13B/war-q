import React, { useEffect, useReducer } from 'react'
import { css } from '@mxenabled/cssinjs'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, FirestoreDB } from '../Firebase'
import { ROLES } from '../const'

export const Builder = (props) => {
  const [user] = useAuthState(auth)
  const [state, dispatch] = useReducer(reducer, {
    q: Array(20).fill('?'),
    remaining: { Tech: 5, Scout: 4, Captain: 3, Major: 2, General: 1, Bomb: 5 },
    userDetails: null,
  })
  const styles = getStyle()

  useEffect(() => {
    if (!user) return () => {}

    const unsub = FirestoreDB.subcribeToDoc('users', user.uid, (doc) => {
      const template = doc.data().template

      if (template?.length === 20) {
        dispatch({
          type: 'HANDLE_SET_TEMPLATE_AND_USER',
          payload: { id: doc.id, ...doc.data() },
        })
      }
    })

    return () => unsub()
  }, [user])

  const handleSelectRole = (role, index) => {
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

    if (state.remaining[formattedRole] < 1) {
      return alert(`You don't have any ${formattedRole}s left!`)
    }
    const currentRole = state.q[index]
    // Update the remaining role count
    let remaining
    if (role === 'reset') {
      const formattedRole = currentRole.charAt(0).toUpperCase() + currentRole.slice(1).toLowerCase()

      remaining = {
        ...state.remaining,
        [formattedRole]: state.remaining[formattedRole] + 1,
      }
    } else {
      remaining = {
        ...state.remaining,
        [formattedRole]: state.remaining[formattedRole] - 1,
        [currentRole]: state.remaining[currentRole] + 1,
      }
    }
    const newQ = [...state.q]

    newQ[index] = role === 'reset' ? '?' : role
    dispatch({ type: 'HANDLE_SELECT_ROLE', payload: { newQ, remaining } })
  }

  return (
    <div style={styles.container}>
      {props.title && <h3>{props.title}</h3>}
      <div className={css(styles.remaining)}>
        <h4 style={styles.remainingLabel}>
          General: <p>{state.remaining.General}</p>
        </h4>
        <h4 style={styles.remainingLabel}>
          Major: <p>{state.remaining.Major}</p>
        </h4>
        <h4 style={styles.remainingLabel}>
          Captain: <p>{state.remaining.Captain}</p>
        </h4>
        <h4 style={styles.remainingLabel}>
          Scout: <p>{state.remaining.Scout}</p>
        </h4>
        <h4 style={styles.remainingLabel}>
          Tech: <p>{state.remaining.Tech}</p>
        </h4>
        <h4 style={styles.remainingLabel}>
          Bomb: <p>{state.remaining.Bomb}</p>
        </h4>
      </div>
      <hr />
      <h5 style={styles.helpText}>Click label on left below to change.</h5>
      {state.q.map((role, index) => (
        <div key={index} style={styles.row}>
          <h3 onClick={() => handleSelectRole('reset', index)} style={styles.word}>
            {role.slice(0, 3)}
          </h3>
          <div style={styles.roleButtons}>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.BOMB, index)}
              style={role === ROLES.BOMB ? styles.selectedRoleButton : styles.roleButton}
            >
              B
            </button>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.TECH, index)}
              style={role === ROLES.TECH ? styles.selectedRoleButton : styles.roleButton}
            >
              T
            </button>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.SCOUT, index)}
              style={role === ROLES.SCOUT ? styles.selectedRoleButton : styles.roleButton}
            >
              S
            </button>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.CAPTAIN, index)}
              style={role === ROLES.CAPTAIN ? styles.selectedRoleButton : styles.roleButton}
            >
              C
            </button>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.MAJOR, index)}
              style={role === ROLES.MAJOR ? styles.selectedRoleButton : styles.roleButton}
            >
              M
            </button>
            <button
              className="btn"
              onClick={() => handleSelectRole(ROLES.GENERAL, index)}
              style={role === ROLES.GENERAL ? styles.selectedRoleButton : styles.roleButton}
            >
              G
            </button>
          </div>
        </div>
      ))}
      <hr />
      {state.q.filter((role) => role === '?').length === 0 && (
        <button
          className="btn"
          onClick={() => props.handleReadyClick(state.q)}
          style={styles.readyButton}
        >
          {props.buttonText}
        </button>
      )}
    </div>
  )
}

const getStyle = () => ({
  container: {},
  remaining: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& h4': {
      color: 'grey',
      fontSize: '.8em',
    },
    '& p': {
      margin: 0,
    },
  },
  remainingLabel: {
    background: '#f5f5f5',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '.8rem',
    width: '32%',
  },
  helpText: {
    textAlign: 'center',
    color: 'darkgray',
    fontSize: '.8rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  roleButtons: {
    flexGrow: 1,
  },
  word: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    fontSize: '.75em',
    marginBottom: '0',
  },
  roleButton: {
    fontSize: '.8em',
    marginLeft: 5,
    minHeight: 0,
    minWidth: 0,
    padding: '0px 10px',
  },
  selectedRoleButton: {
    background: 'black',
    borderRadius: '6px',
    color: 'white',
    fontSize: '.8em',
    marginLeft: 5,
    minHeight: 0,
    minWidth: 0,
    padding: '0px 10px',
  },
  readyButton: {
    width: '100%',
  },
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_SELECT_ROLE':
      return {
        ...state,
        q: action.payload.newQ,
        remaining: action.payload.remaining,
      }
    case 'HANDLE_SET_TEMPLATE_AND_USER':
      return {
        ...state,
        q: action.payload.template,
        remaining: { Tech: 0, Scout: 0, Captain: 0, Major: 0, General: 0, Bomb: 0 },
      }
    case 'HANDLE_SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      }
    default:
      return state
  }
}
