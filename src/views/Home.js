import React from 'react'
import { Button } from 'antd'

export const Home = (props) => {
  const styles = getStyle()

  return (
    <div style={styles.container}>
      <h2>Welcome to War Q</h2>
      <h3>Best of luck out there.</h3>
      <Button onClick={props.handleStart} type="primary">
        Start
      </Button>
      <br />
      <Button onClick={props.handleInstructions}>Instructions</Button>
    </div>
  )
}

const getStyle = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
})
