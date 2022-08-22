import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chats';



const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  let [allData, setAllData] = useState({});
  
 
  const joinRoom = async () => {
    if(room !== '' && userName !== ''){
      socket.emit('join_room',room)
      setShowChat(true)
      const roomName = room;
  
   await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ room: roomName }),
    })
    .then(response => response.json())
    .then((data) => {  
     setAllData(data)
      console.log(allData, '@@@')
    });
  }

  }
  return (
    <div className="App">
     {!showChat ? ( <div className='joinChatContainer'>
      <h3>join a chat</h3>
      <input 
      type='text'
      placeholder='name'
      onChange={(e)=>{setUserName(e.target.value)}}/>

      <input 
      type='text'
      placeholder='Room'
      onChange={(e)=>{setRoom(e.target.value)}}/>
       <button onClick={joinRoom} >Join</button>
       </div>) : ( 
       <Chat socket={socket} username={userName}  room={room} allData={allData} />
        )}
    </div>
   
  );
}

export default App;
