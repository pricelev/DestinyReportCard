import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import './Message.css'

function Message() {
  return (
    <div className="message-top text-center">
      <Jumbotron>
      <h1>Destiny Report Card</h1>
      <p>
        Welcome to Destiny Report Card:
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
      </Jumbotron>
    </div>
  )
}

export default Message
