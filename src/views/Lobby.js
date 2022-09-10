import dayjs from 'dayjs'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { auth, FirestoreDB } from '../Firebase'

export const Lobby = (props) => {
  const [user] = useAuthState(auth)
  const [snapshot, loading] = useCollection(
    FirestoreDB.getDocs('battles', ['playerCount', '==', 1]),
  )

  const handleNewBattle = () => {
    FirestoreDB.addBattle(user.uid)
      .then((res) => props.onNewBattle(res.id))
      .catch((err) => console.log('err', err))
  }
  const handleJoinBatlle = (battleId) => {
    FirestoreDB.updateBattle(battleId, user.uid)
      .then((res) => props.onJoinBattle(battleId))
      .catch((err) => console.log('err', err))
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Lobby</h2>

        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h2>Lobby</h2>

      <h4>Either join an player from the list below or start a new battle. Good luck!</h4>
      <button className="btn" onClick={handleNewBattle} style={styles.button}>
        New Battle
      </button>

      <hr />

      <p>Players waiting:</p>
      {/* Existing Battles */}
      {loading && <p>Loading...</p>}
      {!loading &&
        snapshot &&
        snapshot.docs.map((doc) => {
          console.log('doc', { id: doc.id, ...doc.data() })
          return (
            <button
              className="btn"
              key={doc.id}
              onClick={() => handleJoinBatlle(doc.id)}
              style={styles.battle}
            >
              <p>Battle: {doc.id}</p>
              <p>Players: {doc.get('playerCount')}/2</p>
              <p>
                Started:{' '}
                {doc.get('createdAt')
                  ? dayjs(doc.get('createdAt').toDate()).fromNow()
                  : 'Loading...'}
              </p>
            </button>
          )
        })}
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
    width: '100%',
  },
}
