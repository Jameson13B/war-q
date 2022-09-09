import dayjs from 'dayjs'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getDocs } from '../Firebase'

export const Lobby = (props) => {
  const [snapshot, loading] = useCollection(getDocs('battles', ['player_count', '==', 1]))

  return (
    <div style={styles.container}>
      <h2>Lobby</h2>

      <h4>Either join an player from the list below or start a new battle. Good luck!</h4>
      <button className="btn" onClick={props.onNewBattle} style={styles.button}>
        New Battle
      </button>

      <hr />

      <p>Players waiting:</p>
      {/* Existing Battles */}
      {loading && <p>Loading...</p>}
      {!loading &&
        snapshot &&
        snapshot.docs.map((doc) => (
          <div key={doc.id} onClick={props.onJoinBattle} style={styles.battle}>
            <p>Battle: {doc.id}</p>
            <p>Players: {doc.get('player_count')}/2</p>
            <p>Started: {dayjs(doc.get('created_at').toDate()).fromNow()}</p>
          </div>
        ))}
    </div>
  )
}

const styles = {
  container: {},
  button: {
    marginBottom: '15px',
    width: '100%',
  },
  battle: {
    border: '1px solid black',
    borderRadius: '5px',
    margin: '10px 0',
    padding: '5px',
  },
}
