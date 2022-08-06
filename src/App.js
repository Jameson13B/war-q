import { useState } from 'react'
import { Button } from 'antd'

import { Builder } from './views/Builder'
import { Home } from './views/Home'
import { Instructions } from './views/Instructions'

const VIEWS = { BUILDER: 'BUILDER', HOME: 'HOME', INSTRUCTIONS: 'INSTRUCTIONS' }

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)
  const styles = getStyles()
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>War Q</h1>

        <Button onClick={() => setCurrentView(VIEWS.HOME)}>Home</Button>
      </div>

      {currentView === VIEWS.BUILDER && (
        <Builder handleReadyClick={() => setCurrentView(VIEWS.HOME)} />
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
