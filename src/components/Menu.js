/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/aria-role */
import React from 'react'

export const Menu = (props) => {
  return (
    <ul role="menu-bar">
      <li role="menu-item" tabIndex="0" aria-haspopup="true">
        File
        <ul role="menu">
          <li role="menu-item">
            <a onClick={props.onHomeClick}>Home</a>
          </li>
          <li role="menu-item" className="divider">
            <a onClick={props.onUserClick}>User{props.user !== 'User' && ` (${props.user})`}</a>
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
