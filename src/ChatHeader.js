import React from 'react'
import './ChatHeader.css'
import ShowContacts from './ShowContacts'

const ChatHeader = ({ channelName}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    return (
        <div className='chatHeader' >
            <div className="chatHeader__left">
                <h3><span className="chatHeader__hash">#</span>
                    {channelName}
                    </h3>
            </div>
            <ShowContacts open={open} setOpen={setOpen} anchorRef={anchorRef}/>  
        </div>
    )
}

export default ChatHeader
