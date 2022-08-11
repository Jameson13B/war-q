import { useState } from 'react'
import { Button } from 'antd'

import { Battle } from './views/Battle'
import { Builder } from './views/Builder'
import { Home } from './views/Home'
import { Instructions } from './views/Instructions'
import { Summary } from './views/Summary'
import { User } from './views/User'

const VIEWS = {
  BATTLE: 'BATTLE',
  BUILDER: 'BUILDER',
  HOME: 'HOME',
  INSTRUCTIONS: 'INSTRUCTIONS',
  SUMMARY: 'SUMMARY',
  USER: 'USER',
}

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)
  const styles = getStyles()

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>War Q</h1>

        {currentView !== VIEWS.HOME && (
          <Button onClick={() => setCurrentView(VIEWS.HOME)}>Home</Button>
        )}
      </div>

      {currentView === VIEWS.BATTLE && (
        <Battle handleDoneClick={() => setCurrentView(VIEWS.SUMMARY)} />
      )}

      {currentView === VIEWS.BUILDER && (
        <Builder handleReadyClick={() => setCurrentView(VIEWS.BATTLE)} />
      )}

      {currentView === VIEWS.HOME && (
        <Home
          handleInstructions={() => setCurrentView(VIEWS.INSTRUCTIONS)}
          handleStart={() => setCurrentView(VIEWS.BUILDER)}
        />
      )}

      {currentView === VIEWS.INSTRUCTIONS && (
        <Instructions handleClose={() => setCurrentView(VIEWS.HOME)} />
      )}

      {currentView === VIEWS.SUMMARY && (
        <Summary
          handleGoToHome={() => setCurrentView(VIEWS.HOME)}
          handleReadyUp={() => setCurrentView(VIEWS.BUILDER)}
        />
      )}

      {currentView === VIEWS.USER && <User />}
    </div>
  )
}

const getStyles = () => ({
  app: {
    margin: '0 auto',
    maxWidth: 400,
    minWidth: 320,
    padding: 15,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
})

export default App
