import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { auth } from './firebase';
import {useHistory} from 'react-router-dom'

export default function SimpleMenu({ user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    auth.signOut().then(() => {
        localStorage.clear();
        setAnchorEl(null);
        history.push('/signin');
    })
}

  return (
    <div>
      <Avatar src={user?.photo} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></Avatar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="user__menu"
      >
        <MenuItem  className="user__item"> <Avatar src={user?.photo}/> </MenuItem>
        <MenuItem  className="user__item"> <h6>UserId:</h6> <p>#{user?.uid?.substring(0, 5)}</p> </MenuItem>
        <MenuItem  className="user__item"> <h6>Username:</h6> <p> {user?.displayName}</p> </MenuItem>
        <MenuItem  className="user__item"><h6>Email:</h6> <p> {user?.email}</p>  </MenuItem>
        <MenuItem className="button" onClick={signout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}