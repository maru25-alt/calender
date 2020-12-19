import React from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from './features/userSlice'
import { setChannelInfo, selectChannelName, setChannelUsers} from './features/appSlice'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import db from './firebase'
import firebase from 'firebase'
import { IconButton } from '@material-ui/core'

const Chat = ({match} ) => {
    const user = useSelector(selectUser)
    const channelId = match.params.id
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null)
    const [loading, setloading] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (channelId) {
            setloading(true)
            db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
            setloading(false)
        }
    }, [channelId])

    useEffect(() => {
        db.collection('channels').doc(channelId).get().then(snap => {
            const channel = snap.data();
            dispatch(setChannelInfo({
                channelId: channelId,
                channelName: channel.channelName,
                channelProfile: channel.profileUrl,
                channelCreatedBy: channel.createdBy,
                channelCreatedAt: new Date(channel.createdAt?.toDate()).toUTCString() 
               }));
        })
    }, [channelId, dispatch])

    useEffect(() => {
       db.collection('channels').doc(channelId).collection('users').onSnapshot(snapshot => {
        var users = []
           snapshot.docs.map(async(doc) => {
               await db.collection('users').doc(doc.id).get().then(snap => {
                  const user = snap.data();
                  users = [...users, {
                    displayName: user.displayName,
                    userID : snap.id,
                    profile: user.profileUrl
                }]
               });
               dispatch(setChannelUsers({
                   channelUsers: users
               }))
              
           })
         
       })
    }, [channelId, dispatch])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           
        })

        setInput('')
    }

    return (
        <div className='chat' >
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
                  {loading && 
                    <div className="text-center">
                         <img width="100" src="https://www.fogelstad.org/core/dependencies/loader.gif" alt=""/>
                    </div>
                    }
                    {messages.map((message , index) => (
                        <Message key={index} message={message.message} timestamp={message.timestamp} user={message.user} />
                    ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat__input">
                <form>
                    <input type="text" disabled={!channelId} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                    <IconButton className='chat__inputButton' onClick={sendMessage} disabled={!channelId || input === ''} type='submit'>
                        <SendRoundedIcon fontSize='large'/>
                    </IconButton>
                </form>

                <div className="chat__inputIcon">
                    <AddCircleIcon fontSize='large' />
                    {/* <CradGiftcardIcon fontSize='large' />
                    <GifIcon fontSize='large' /> */}
                    <EmojiEmoticonsIcon fontSize='large' />
                </div>
            </div>
        </div>
    )
}

export default Chat
