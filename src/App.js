import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

// import { getCurrentUser } from './index'
import { Battle } from './views/Battle'
import { Builder } from './views/Builder'
import { Home } from './views/Home'
import { Instructions } from './views/Instructions'
import { Summary } from './views/Summary'
import { User } from './views/User'

import { Menu } from './components/Menu'
import { TitleBar } from './components/TitleBar'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

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
  // const [currentUser, setCurrentUser] = useState(null)
  const styles = getStyles()

  useEffect(() => {
    // getCurrentUser().then((user) => setCurrentUser(user))
  }, [])

  const handleCloseApp = () => alert('Working on having this close the app/window/tab.')
  const handleToggleDarkMode = () => alert('This will toggle dark/light mode.')

  return (
    <div className="window" style={styles.app}>
      <TitleBar onCloseApp={handleCloseApp} onToggleDarkMode={handleToggleDarkMode} />
      <Menu
        onHomeClick={() => setCurrentView(VIEWS.HOME)}
        onInstructionsClick={() => setCurrentView(VIEWS.INSTRUCTIONS)}
        onUserClick={() => setCurrentView(VIEWS.USER)}
        // user={currentUser ? currentUser.attributes.username : 'User'}
      />
      <div className="window-pane">
        {currentView === VIEWS.BATTLE && (
          <Battle handleDoneClick={() => setCurrentView(VIEWS.SUMMARY)} />
        )}

        {currentView === VIEWS.BUILDER && (
          <Builder handleReadyClick={() => setCurrentView(VIEWS.BATTLE)} />
        )}

        {currentView === VIEWS.HOME && <Home handleStart={() => setCurrentView(VIEWS.BUILDER)} />}

        {currentView === VIEWS.INSTRUCTIONS && (
          <Instructions handleHome={() => setCurrentView(VIEWS.HOME)} />
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
    minHeight: '100vh',
    maxWidth: 400,
    minWidth: 320,
    // padding: 15,
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
