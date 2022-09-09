import React from 'react'

export const About = (props) => {
  const styles = getStyle()

  return (
    <div style={styles.container}>
      <h2>About</h2>

      <p>This is one of many games that was created by Jameson.</p>
      <div>
        <hr />
      </div>
      <p>
        Check out <a href="https://www.jamesonb.com/">Jameson's Portfolio</a> for more games and
        projects!
      </p>
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
