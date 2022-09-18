import React, { useEffect, useState } from 'react'

import { FirestoreDB } from '../Firebase'

export const Battle = (props) => {
  const [currentView] = useState('GET READY')
  const [battleDetails, setBattleDetails] = useState(null)
  const styles = getStyles()

  useEffect(() => {
    const unsub = FirestoreDB.subscribeToDoc('battles', props.battle.id, (doc) =>
      setBattleDetails({ id: doc.id, ...doc.data() }),
    )

    return () => unsub()
  }, [props.battle.id])

  const aStyles =
    props.battle.player === 'A' ? styles.activeReadyUpIndicator : styles.readyUpIndication
  const bStyles =
    props.battle.player === 'B' ? styles.activeReadyUpIndicator : styles.readyUpIndication

  if (currentView === 'GET READY') {
    return (
      <div style={styles.container}>
        <h1>Battle - Get Ready</h1>
        <button
          className="btn"
          disabled={battleDetails?.playerAReady}
          onClick={() => console.log('Ready')}
          style={styles.button}
        >
          Ready Up!
        </button>

        <hr />

        <div style={styles.readyUpSection}>
          <div style={styles.playerASection}>
            <div style={aStyles}>
              <h3>You</h3>
              <h4>{battleDetails?.playerAReady ? 'Ready!' : '*Ready Up*'}</h4>
            </div>
            <ul>
              {battleDetails?.APlayerQ.map((item) => (
                <li style={styles.item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.playerBSection}>
            <div style={bStyles}>
              <h3>{battleDetails?.BPlayerId || 'Looking...'}</h3>
              <h4>{battleDetails?.playerBReady ? 'Ready!' : 'Please wait'}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1>Battle - Go</h1>
      <button className="btn" onClick={props.handleDoneClick}>
        Finish
      </button>
    </div>
  )
}

const getStyles = () => ({
  container: {},
  activeReadyUpIndicator: {
    background: '#f5f5f5',
    border: '2px solid black',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '.8rem',
    width: '95%',
  },
  readyUpSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  playerASection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  playerBSection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  readyUpIndication: {
    background: '#f5f5f5',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '.8rem',
    width: '95%',
  },
  item: {
    fontSize: '1rem',
  },
  button: {
    width: '100%',
  },
})
