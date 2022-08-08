import React from 'react'
import { Button } from 'antd'

export const Battle = (props) => {
  const styles = getStyles()

  return (
    <div style={styles.container}>
      <h1>Battle</h1>
      <Button onClick={props.handleDoneClick} type="primary">
        Finish
      </Button>
    </div>
  )
}

const getStyles = () => ({
  container: {},
})
