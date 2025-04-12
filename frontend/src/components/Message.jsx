import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function Message({ message }) {
  const scroll=useRef();
  const {authUser, selectedUser}=useSelector(store=>store.user)
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  return (
    <>
      <div ref={scroll} className={`chat ${authUser?._id===message?.senderId ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Chat profile"
              src={message.senderId=== authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{new Date(message.createdAt).toLocaleTimeString()}</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
      </div>
    </>
  );
}

export default Message;
