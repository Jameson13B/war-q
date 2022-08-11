import React, { useReducer } from 'react'
import { Button } from 'antd'
import { css } from '@mxenabled/cssinjs'

export const Builder = (props) => {
  const styles = getStyle()
  const [state, dispatch] = useReducer(reducer, {
    q: Array(15).fill('?'),
    remaining: { Shield: 3, Fighter: 3, Gunner: 3, Bomber: 3, Tech: 3 },
  })

  const handleSelectRole = (role, index) => {
    if (state.remaining[role] < 1) {
      return alert(`You don't have any ${role}s left!`)
    }
    const currentRole = state.q[index]
    // Update the remaining role count
    const remaining = {
      ...state.remaining,
      [role]: state.remaining[role] - 1,
      [currentRole]: state.remaining[currentRole] + 1,
    }
    const newQ = [...state.q]

    newQ[index] = role
    dispatch({ type: 'HANDLE_SELECT_ROLE', payload: { newQ, remaining } })
  }

  return (
    <div style={styles.container}>
      <h2>Build your "Q" here.</h2>
      <div className={css(styles.remaining)}>
        <h4>Shield: {state.remaining.Shield}</h4>
        <h4>Fighter: {state.remaining.Fighter}</h4>
        <h4>Gunner: {state.remaining.Gunner}</h4>
        <h4>Bomber: {state.remaining.Bomber}</h4>
        <h4>Tech: {state.remaining.Tech}</h4>
      </div>
      <hr />
      {state.q.map((role, index) => (
        <div key={index} style={styles.row}>
          <h3 style={styles.word}>{index + 1}:</h3>
          <h3 onClick={() => handleSelectRole('?', index)} style={styles.word}>
            {role}
          </h3>
          <Button
            onClick={() => handleSelectRole('Shield', index)}
            style={styles.roleButton}
            type={role === 'Shield' ? 'primary' : 'default'}
          >
            S
          </Button>
          <Button
            onClick={() => handleSelectRole('Fighter', index)}
            style={styles.roleButton}
            type={role === 'Fighter' ? 'primary' : 'default'}
          >
            F
          </Button>
          <Button
            onClick={() => handleSelectRole('Gunner', index)}
            style={styles.roleButton}
            type={role === 'Gunner' ? 'primary' : 'default'}
          >
            G
          </Button>
          <Button
            onClick={() => handleSelectRole('Bomber', index)}
            style={styles.roleButton}
            type={role === 'Bomber' ? 'primary' : 'default'}
          >
            B
          </Button>
          <Button
            onClick={() => handleSelectRole('Tech', index)}
            style={styles.roleButton}
            type={role === 'Tech' ? 'primary' : 'default'}
          >
            T
          </Button>
        </div>
      ))}
      <hr />
      {state.q.filter((role) => role === '?').length === 0 && (
        <Button onClick={props.handleReadyClick} style={styles.readyButton} type="primary">
          Ready
        </Button>
      )}
    </div>
  )
}

const getStyle = () => ({
  container: {},
  remaining: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      color: 'grey',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  word: {
    flexGrow: '1',
  },
  roleButton: {
    marginLeft: 5,
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
