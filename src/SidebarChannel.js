import React from 'react'
import './SidebarChannel.css'
import {useHistory} from 'react-router-dom';
import { Avatar } from '@material-ui/core';

const SidebarChannel = ({ id, channel}) => {
    const history = useHistory();

    const handleClick = async() => {
        history.push(`/channel/${id}`)   
    }
    return (
        <div className='sidebarChannel' onClick={handleClick} >
            <Avatar src={channel?.profileUrl} alt={channel?.channelName}/>
             <h6><span className='sidebarChannel__hash'>#</span>{channel?.channelName}</h6>
        </div>
    )
}

export default SidebarChannel
