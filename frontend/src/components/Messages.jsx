import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/GetUserMessages.jsx'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage.jsx';

function Messages() {
  useGetMessages();
  useGetRealTimeMessage()
  const {messages} =useSelector(store=>store.message);
  if(!messages){
    return;
  }
  return (
    <div className='flex-1 overflow-y-auto p-4'>
      {
         messages && messages?.map((message)=>{
            return(
              <Message key={message._id} message={message}/>
            )
          })
      }
    </div>
  )
}

export default Messages
