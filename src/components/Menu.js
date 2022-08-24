/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../Firebase'

export const Menu = (props) => {
  const [user, loading, error] = useAuthState(auth)

  const userSecondary = () => {
    if (loading) {
      return 'Loading...'
    } else if (error) {
      return 'Error...'
    } else if (user) {
      return user.phoneNumber
    } else {
      return 'Sign In'
    }
  }

  return (
    <ul role="menu-bar">
      <li role="menu-item" tabIndex="0" aria-haspopup="true">
        File
        <ul role="menu">
          <li role="menu-item">
            <a onClick={props.onHomeClick}>Home</a>
          </li>
          <li role="menu-item" className="divider">
            <a onClick={props.onUserClick}>User{` (${userSecondary()})`}</a>
          </li>
          <li role="menu-item">
            <a onClick={() => alert('One More')}>One More</a>
          </li>
        </ul>
      </li>
      <li role="menu-item" tabIndex="0" aria-haspopup="true">
        Help
        <ul role="menu">
          <li role="menu-item">
            <a onClick={props.onInstructionsClick}>Instructions</a>
          </li>
          <li role="menu-item">
            <a onClick={() => alert('One More')}>About</a>
          </li>
        </ul>
      </li>
    </ul>
  )
}
