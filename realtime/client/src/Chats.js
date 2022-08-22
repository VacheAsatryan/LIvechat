import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

function  Chat({allData,socket,username,room}){
    const [currentMessage ,setCurrentMessage] = useState('');
    const [messageList ,setMessageList] = useState([]);
    const dataArray = Object.values(allData)

    const sendMessage = async () => {
        if(currentMessage !== ''){
    
            const messageData ={
                room: room,
                author :username,
                message : currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes(), 
            };
            await socket.emit('send_message',messageData);
            setMessageList((list) => [...list, messageData,]);
            setCurrentMessage('');
        }
    };
  
    useEffect(() => {
        socket.on('recive_message', (data) => {
           setMessageList((list) => [...list, data])
        })
    }, [socket])
    return(
        <div className="chat-window">
            <div className="chat-header">
                <p>Live chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {dataArray.map((data) => {
                    return (
                        <div className="message" id={username === data.data.author ? "you" : "other"} >
                         <div>
                            <div className="message-content">
                                <p> {data.data.message} </p>
                            </div>
                            <div className="message-meta">
                                <p id="time"> {data.data.time} </p>
                                <p id="author" > {data.data.author} </p>
                            </div>
                         </div>      
                        </div>
                    )
                })}
               
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? "you" : "other"} >
                         <div>
                            <div className="message-content">
                                <p> {messageContent.message} </p>
                            </div>
                            <div className="message-meta">
                                <p id="time"> {messageContent.time} </p>
                                <p id="author" > {messageContent.author} </p>
                            </div>
                         </div>      
                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer ">
                <input 
                value={currentMessage}
                type='text'
                 placeholder='input your message'
                 onChange={(e)=>{setCurrentMessage(e.target.value)}}
                onKeyPress={(e) => {e.key === "Enter" && sendMessage()}} />
                <button onClick={sendMessage} >send </button>
            </div>
        </div>
    )
}
export default Chat;