import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from './features/userSlice'
import db from './firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import CreateChannel from './CreateNewChannel';
import ViewProfile from './ViewProfile';


const Sidebar = () => {
    const user = useSelector(selectUser);
   // const channels = useSelector(selectChannels)
    const dispatch = useDispatch();
    const [channels, setChannels] = useState([])
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false)
 
   
    useEffect(() => {
      const  userId = localStorage.getItem('isLogged');
      setloading(true);
        db.collection('channels').onSnapshot(snapshot => {
            var channelsCollections = []
             snapshot.docs.map(async(doc) => {
                const userExists = await db.collection('channels').doc(doc.id).collection('users').doc(userId).get();
                if(userExists.exists){
                     channelsCollections = [...channelsCollections, {
                        id: doc.id,
                        channel: doc.data()
                    }]
                }
              setChannels(channelsCollections);
            //    dispatch(setChannels({
            //        channels :channelsCollections
            //     }))
            })
            setloading(false)
        })
    }, [dispatch])
    console.log(channels)
    return (
        <div className='sidebar' >
             <div className="sidebar__profile">
                <ViewProfile  user={user}/>
                <div className="sidebar__profileInfo">
                    <h5>{user?.displayName}</h5>
                    <p>#{user?.uid?.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>


            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Messaging Channels</h4>
                    </div>
                    <Tooltip title="Create New Channel">
                        <AddIcon onClick={() => setOpen(true)} className='sidebar__addChannel' />
                    </Tooltip>
                   
                </div>
                <div className="sidebar__channelsList">
                    {loading && 
                    <div className="text-center">
                         <img width="100" src="https://www.fogelstad.org/core/dependencies/loader.gif" alt=""/>
                    </div>
                    }
                    {
                       channels &&  channels.map(({ id, channel }) => (
                            <SidebarChannel key={id} id={id} channel={channel} />
                        ))
                    }
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon className='sidebar__voiceIcons' fontSize='large' />
                <div className="sidebar__voiceInfo">
                    <h6>Voice Connected</h6>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
           <CreateChannel  user={user} open={open} setOpen={setOpen}  />
        </div>
    )
}

export default Sidebar
