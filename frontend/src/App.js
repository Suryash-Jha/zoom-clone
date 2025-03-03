import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import socket from './socket';


const App = () => {

  const [messages, setMessages] = useState([])
  const [msgInput, setMsgInput] = useState("")
  const [roomInput, setRoomInput] = useState("")


  const handleMessage = () => {
    if (msgInput.length < 1) return;
    console.log('message recieved', msgInput)
    setMessages((prev)=> [...prev, msgInput])
    socket.emit('message', msgInput, roomInput)
    setMsgInput('')
  }
  useEffect(() => {
    const handleMessage = (msg) => {
      console.log('message from server: ', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
  
    socket.on('message', handleMessage);
  
    return () => {
      socket.off('message', handleMessage);
    };
  }, []);
  
  const handleRoom = () => {
    if (roomInput.length < 1) return;

    console.log('room recieved')
    setMessages((prev)=>[...prev, `You Joined Room: ${roomInput}`])
    socket.emit('join-room', roomInput)
    // setRoomInput('')
  }
  console.log(messages, '----+++')
  return (
    <div className="mainContainer">

      <div className="chatContainer">
        {
          messages.map((msg, i) => {
            return <p style={{
              background: !(i % 2) ? '#c4cec4' : '#f4f5f4'
            }}
              id={i}> {msg}</p>
          })
        }
      </div>
      <div className="msgInputContainer">
        <input
          value={msgInput}
          type="text"
          id="msgText"
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="Enter Message Here"
        />
        <button
          onClick={handleMessage}
        >
          Send
        </button>
      </div>
      <div className="roomChangeContainer">
        <input
          value={roomInput}
          type="text"
          id="roomText"
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder="Enter Room Id Here"

        />
        <button
          onClick={handleRoom}
        >Join</button>
      </div>

    </div>
  );
}

export default App;
