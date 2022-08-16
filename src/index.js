import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Parse from 'parse/dist/parse.min.js'

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID
const PARSE_HOST_URL = 'https://parseapi.back4app.com/'
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL

export const getCurrentUser = async () => {
  const currentUser = await Parse.User.current()
  return currentUser
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
)
