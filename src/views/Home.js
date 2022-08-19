import React from 'react'
export const Home = (props) => {
  const styles = getStyle()

  return (
    <div style={styles.container}>
      <h2>Welcome to War Q</h2>
      <h3>Best of luck out there.</h3>
      <br />
      <button className="btn" onClick={props.handleStart} type="primary">
        Start
      </button>
      <br />
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
