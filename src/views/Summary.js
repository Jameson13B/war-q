import React from 'react'
import { Button } from 'antd'

export const Summary = (props) => {
  const styles = getStyles()

  return (
    <div style={styles.container}>
      <h1>Summary</h1>
      <Button onClick={props.handleReadyUp} type="primary">
        Ready Up
      </Button>
      <Button onClick={props.handleGoToHome}>Home</Button>
    </div>
  )
}

const getStyles = () => ({
  container: {},
})
