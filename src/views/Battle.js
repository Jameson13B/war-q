import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { db } from '../Firebase'

export const Battle = (props) => {
  const [currentView] = useState('GET READY')
  const [battleDetails, setBattleDetails] = useState(null)
  const styles = getStyles()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'battles', props.battleId), (doc) =>
      setBattleDetails({ id: doc.id, ...doc.data() }),
    )

    return () => unsub()
  }, [props.battleId])

  if (currentView === 'GET READY') {
    return (
      <div style={styles.container}>
        <h1>Battle - Get Ready</h1>
        {/* This section shows the players ready up status. */}
        <div style={styles.readyUpSection}>
          <div style={styles.readyUpIndication}>
            <h3>Player A:</h3>
            <h4>{battleDetails?.playerAReady ? 'Ready!' : '*Ready Up*'}</h4>
          </div>
          <div style={styles.readyUpIndication}>
            <h3>Player B:</h3>
            <h4>{battleDetails?.playerBReady ? 'Ready!' : '*Ready Up*'}</h4>
          </div>
        </div>
        <button
          disabled={battleDetails?.playerAReady}
          className="btn"
          onClick={() => console.log('Ready')}
        >
          Ready Up!
        </button>
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
  readyUpSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  readyUpIndication: {
    background: '#f5f5f5',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '.8rem',
    width: '45%',
  },
})
