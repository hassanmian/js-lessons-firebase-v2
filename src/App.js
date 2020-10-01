import React, { useState, useEffect } from 'react';
import firebase from "./firebase"

function App() {
  const [messageList, setMessageList] = useState(null)
  const [message, setMessage] = useState("")
  const database = firebase.database()
  const chatRef = database.ref("chat")

  useEffect(() => {
    chatRef.on('value', snapshot => {
      setMessageList(snapshot.val())
    })
  }, [])

  function handleSendMessage(event) {
    event.preventDefault()
    const payload = {
      username: "hassanmian",
      message: message
    }
    chatRef.push(payload, error => {
      if(error) {
        console.log("An error has occured")
      } else {
        setMessage("")
      }
    })
  }

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={handleSendMessage}>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Send Message</button>
      </form>
      {messageList && Object.entries(messageList).reverse().map(messageItem => {
        const key = messageItem[0]
        const messageData = messageItem[1]
        return (
        <p key={key}>{messageData.username} says: "{messageData.message}"</p>
        )
      })}
    </div>
  );
}

export default App;
