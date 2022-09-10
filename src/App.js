import { useState } from 'react'
import dayjs from 'dayjs'

import { Battle } from './views/Battle'
import { Builder } from './views/Builder'
import { Home } from './views/Home'
import { Instructions } from './views/Instructions'
import { Lobby } from './views/Lobby'
import { Summary } from './views/Summary'
import { User } from './views/User'
import { About } from './views/About'
import { Admin } from './views/Admin'

import { Menu } from './components/Menu'
import { TitleBar } from './components/TitleBar'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const VIEWS = {
  ABOUT: 'ABOUT',
  ADMIN: 'ADMIN',
  BATTLE: 'BATTLE',
  BUILDER: 'BUILDER',
  HOME: 'HOME',
  INSTRUCTIONS: 'INSTRUCTIONS',
  LOBBY: 'LOBBY',
  SUMMARY: 'SUMMARY',
  USER: 'USER',
}

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)
  const [battleId, setBattleId] = useState(null)
  const styles = getStyles()

  const handleToggleDarkMode = () => alert('This will toggle dark/light mode.')

  return (
    <div className="window" style={styles.app}>
      <TitleBar
        handleGoHome={() => setCurrentView(VIEWS.HOME)}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <Menu
        onGoAbout={() => setCurrentView(VIEWS.ABOUT)}
        onGoToAdmin={() => setCurrentView(VIEWS.ADMIN)}
        onHomeClick={() => setCurrentView(VIEWS.HOME)}
        onInstructionsClick={() => setCurrentView(VIEWS.INSTRUCTIONS)}
        onUserClick={(e) => {
          e.preventDefault()
          setCurrentView(VIEWS.USER)
        }}
      />
      <div className="window-pane">
        {currentView === VIEWS.ABOUT && <About />}

        {currentView === VIEWS.ADMIN && <Admin />}

        {currentView === VIEWS.BATTLE && (
          <Battle battleId={battleId} handleDoneClick={() => setCurrentView(VIEWS.SUMMARY)} />
        )}

        {currentView === VIEWS.BUILDER && (
          <Builder
            buttonText="Ready"
            handleReadyClick={() => setCurrentView(VIEWS.LOBBY)}
            title='Build your "Q" then select Ready.'
          />
        )}

        {currentView === VIEWS.HOME && <Home handleStart={() => setCurrentView(VIEWS.BUILDER)} />}

        {currentView === VIEWS.INSTRUCTIONS && (
          <Instructions handleHome={() => setCurrentView(VIEWS.HOME)} />
        )}

        {currentView === VIEWS.LOBBY && (
          <Lobby
            onNewBattle={(id) => {
              setBattleId(id)
              setCurrentView(VIEWS.BATTLE)
            }}
            onJoinBattle={(id) => {
              setBattleId(id)
              setCurrentView(VIEWS.BATTLE)
            }}
          />
        )}

        {currentView === VIEWS.SUMMARY && (
          <Summary
            handleGoToHome={() => setCurrentView(VIEWS.HOME)}
            handleReadyUp={() => setCurrentView(VIEWS.BUILDER)}
          />
        )}

        {currentView === VIEWS.USER && <User />}
      </div>
    </div>
  )
}

const getStyles = () => ({
  app: {
    margin: '0 auto',
    maxHeight: '100vh',
    minHeight: '100vh',
    maxWidth: 400,
    minWidth: 320,
    overflow: 'auto',
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
