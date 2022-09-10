import React from 'react'
import { FirebaseAuth } from '../Firebase'

export const TitleBar = (props) => {
  return (
    <div className="title-bar">
      <button
        aria-label="Close"
        className="close"
        onClick={(e) => {
          e.preventDefault()

          // eslint-disable-next-line no-restricted-globals
          if (confirm('Are you sure you want to log out?')) {
            FirebaseAuth.signOut()
            props.handleGoHome()
          }
        }}
      ></button>
      <h1 className="title">War Q</h1>
      <button aria-label="Resize" className="resize" onClick={props.onToggleDarkMode}></button>
    </div>
  )
}
