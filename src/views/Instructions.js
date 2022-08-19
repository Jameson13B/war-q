import React from 'react'

export const Instructions = (props) => {
  const styles = getStyle()

  return (
    <div style={styles.container}>
      <h2>How War Q Works</h2>

      <p>
        Each person starts by creating they queues("Q") compromised of different roles. Onces locked
        in, the roles will then automate a battle. The first person to have all the roles in their Q
        killed is out.
      </p>
      <p>Continue to iterate, improve, and strategize to beat your opponent.</p>

      <button className="btn" onClick={props.handleHome} type="primary">
        Home
      </button>
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
