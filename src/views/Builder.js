import React, { useReducer } from 'react'
import { Button } from 'antd'
import { css } from '@mxenabled/cssinjs'

import { ROLES } from '../const'

export const Builder = (props) => {
  const styles = getStyle()
  const [state, dispatch] = useReducer(reducer, {
    q: Array(20).fill('?'),
    remaining: { Tech: 5, Scout: 4, Captain: 3, Major: 2, General: 1, Bomb: 5 },
  })

  const handleSelectRole = (role, index) => {
    if (role === '?') return () => {}

    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

    if (state.remaining[formattedRole] < 1) {
      return alert(`You don't have any ${formattedRole}s left!`)
    }
    const currentRole = state.q[index]
    // Update the remaining role count
    const remaining = {
      ...state.remaining,
      [formattedRole]: state.remaining[formattedRole] - 1,
      [currentRole]: state.remaining[currentRole] + 1,
    }
    const newQ = [...state.q]

    newQ[index] = role
    dispatch({ type: 'HANDLE_SELECT_ROLE', payload: { newQ, remaining } })
  }

  return (
    <div style={styles.container}>
      <h3>{props.title}</h3>
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
      {state.q.map((role, index) => (
        <div key={index} style={styles.row}>
          <h3 style={styles.word}>{index + 1}:</h3>
          <h3 onClick={() => handleSelectRole('?', index)} style={styles.word}>
            {role.slice(0, 3)}
          </h3>
          <Button
            onClick={() => handleSelectRole(ROLES.BOMB, index)}
            style={styles.roleButton}
            type={role === ROLES.BOMB ? 'primary' : 'default'}
          >
            B
          </Button>
          <Button
            onClick={() => handleSelectRole(ROLES.TECH, index)}
            style={styles.roleButton}
            type={role === ROLES.TECH ? 'primary' : 'default'}
          >
            T
          </Button>
          <Button
            onClick={() => handleSelectRole(ROLES.SCOUT, index)}
            style={styles.roleButton}
            type={role === ROLES.SCOUT ? 'primary' : 'default'}
          >
            S
          </Button>
          <Button
            onClick={() => handleSelectRole(ROLES.CAPTAIN, index)}
            style={styles.roleButton}
            type={role === ROLES.CAPTAIN ? 'primary' : 'default'}
          >
            C
          </Button>
          <Button
            onClick={() => handleSelectRole(ROLES.MAJOR, index)}
            style={styles.roleButton}
            type={role === ROLES.MAJOR ? 'primary' : 'default'}
          >
            M
          </Button>
          <Button
            onClick={() => handleSelectRole(ROLES.GENERAL, index)}
            style={styles.roleButton}
            type={role === ROLES.GENERAL ? 'primary' : 'default'}
          >
            G
          </Button>
        </div>
      ))}
      <hr />
      {state.q.filter((role) => role === '?').length === 0 && (
        <Button onClick={props.handleReadyClick} style={styles.readyButton} type="primary">
          {props.buttonText}
        </Button>
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
    width: '32%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  word: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    fontSize: '.8em',
    marginBottom: '0',
  },
  roleButton: {
    fontSize: '.8em',
    marginLeft: 5,
    padding: '4px 13px',
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
    default:
      return state
  }
}
