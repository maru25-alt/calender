import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'
import {timeStamp} from './utils/time';
import { selectUser } from './features/userSlice';
import { useSelector} from 'react-redux'

const Message = ({ timestamp, user, message }) => {
    const currentUser = useSelector(selectUser)
  
    return (
        <div className={currentUser?.uid === user?.uid ? " message__received" : "message"}>
            <Avatar src={user?.photo} />
            <div className="message__info">
                <h6>{user?.displayName}</h6>
                <div className="message__content">
                    <p>{message}</p> 
                   <span className="message__timestamp">{timeStamp(timestamp)}</span>
                </div>      
           </div>
       </div>
    )
}

export default Message
