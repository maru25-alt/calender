import React from 'react';
//import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './ShowContacts.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux'
import { selectChannelCreatedAt, selectChannelCreatedBy, selectChannelId, selectChannelName, selectChannelProfile, selectChannelUsers } from './features/appSlice'


const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: "#fff"
  }
}));

export default function MenuListComposition() {
  const channelId = useSelector(selectChannelId)
  const channelName = useSelector(selectChannelName)
  const channelCreatedAt = useSelector(selectChannelCreatedAt)
  const channelCreatedBy = useSelector(selectChannelCreatedBy)
  const channelProfile = useSelector(selectChannelProfile)
  const channelUsers = useSelector(selectChannelUsers)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <IconButton  
          ref={anchorRef}
          aria-controls='menu-list-grow'
          aria-haspopup="true"
          TransitionComponent={Fade}
          onClick={handleToggle}>
           <MoreVertIcon className={classes.icon}  fontSize='large'/>
      </IconButton>
        <Popper open={open} className="menu__container" anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                   <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <div className="groupDetails ">
                          <div className="leftSide ">
                        
                          </div>
                          <div className="rightSide ">
                             <Avatar src={channelProfile} alt={channelName}/>
                              <h6>Channel Name: #{channelName}  ({channelUsers.length} member(s)</h6>
                              <div>
                                 <h6>Channel Id:</h6>
                                 <p> {channelId}</p>
                              </div>
                              <div>
                                   <h6>Create By: </h6>
                                  <p>{channelCreatedBy} </p>
                              </div>
                             <div>
                               <h6>Created At:</h6>
                               <p>{channelCreatedAt}</p>
                             </div>
                              
                          </div>
                        </div>
                     {channelUsers && channelUsers.map(user =>   
                     <MenuItem key={user.userID}>
                      <div className="user">
                        <div className="leftSide">
                          <Avatar src={user.profile}></Avatar>
                           <p>{user.displayName}</p>
                        </div>
                        {user.userID === channelCreatedBy  && 
                         <div className="rightSide">
                           <Tooltip title="remove the user" placement="top">
                           <IconButton>
                               <DeleteIcon/>
                           </IconButton>
                           </Tooltip>
                         </div>
                       }
                      </div>
                    </MenuItem>)}
                    <div className="text-center">
                      <button className="btn btn-danger">Leave Channel</button>
                    </div>
                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
     
    </div>
  );
}