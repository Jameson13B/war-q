import React from 'react'

export const TitleBar = (props) => {
  return (
    <div className="title-bar">
      <button aria-label="Close" className="close" onClick={props.onCloseApp}></button>
      <h1 className="title">War Q</h1>
      <button
        aria-label="Resize"
        className="resize"
        onClick={props.onToggleDarkMode}
      ></button>
    </div>
  )
}
