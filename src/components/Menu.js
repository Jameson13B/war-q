/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

import { auth, docRefById, signOut } from '../Firebase'

export const Menu = (props) => {
  const [user, loading, error] = useAuthState(auth)
  const [snapshot, userDataLoading] = useDocumentOnce(user ? docRefById('users', user.uid) : null)

  const userSecondary = () => {
    if (loading) {
      return 'Loading...'
    } else if (error) {
      return 'Error...'
    } else if (!userDataLoading && snapshot?.get('handle')) {
      return snapshot.get('handle')
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
          {user && (
            <li role="menu-item">
              <a onClick={() => signOut(auth)}>Logout</a>
            </li>
          )}
        </ul>
      </li>
      <li role="menu-item" tabIndex="0" aria-haspopup="true">
        Help
        <ul role="menu">
          <li role="menu-item">
            <a onClick={props.onInstructionsClick}>Instructions</a>
          </li>
          <li role="menu-item">
            <a onClick={props.onGoAbout}>About</a>
          </li>
          <li role="menu-item">
            <a onClick={props.onGoToAdmin}>Admin</a>
          </li>
        </ul>
      </li>
    </ul>
  )
}
