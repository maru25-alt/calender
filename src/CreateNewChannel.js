import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Avatar, IconButton} from '@material-ui/core';
import db, {storage} from './firebase'
import './CreateChannel.css'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom'

let channelId = uuidv4();function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}





export default function NewChannel({open , setOpen, user}) {
 const [channelName, setchannelName] = useState("");
 const [profile, setprofile] = useState('');
 const [file, setfile] = useState('');
 const [loading, setloading] = useState(false);
const [uploadErr, setuploadErr] = useState("");
const [value, setValue] = React.useState(0);
const [channelCode, setchannelCode] = useState("");
const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const handleChangeImage = (e) => {
    setuploadErr("")
    const selected = e.target.files[0];
      if(selected.size > 2000000 ){
          setuploadErr("file is too large")
      }
      else if(selected){
        setfile(selected)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selected);
        fileReader.onloadend = () => {
            setprofile(fileReader.result)   
        };
      } 
  else{
    setuploadErr("No file selected")
  }
};

const handleJoinChannel = async() => {
  if(channelCode !== ''){
    setloading(true);
    const channel = db.collection('channels').doc(channelCode);
    const getChannel = await channel.get();
    if(!getChannel.exists){
      toast.error("wrong channel code" , {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });  
        setloading(false);
    }
    else{
      channel.collection('users')
      .doc(user.uid)
      .set({
        userID: user.uid
      })
      .catch(err => {
        console.log(err)
      })
      setloading(false);
      setOpen(false);
      history.push(`/channel/${channelCode}`)
    }
   
  }
}

const addUser = async() => {
   await db.collection('channels')
  .doc(channelId)
  .collection('users')
  .doc(user.uid)
  .set({
    userID: user.uid
  })
  .catch(err => {
    console.log(err)
  })
}

const handleUpload = async() => {
    if(channelName !== ''){
        setloading(true)
        if(file){
            const uploadTask = storage.ref(`/users/${file.name}`);
            uploadTask.put(file)
            .on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            }, (err) => {
                console.log(err);
                setloading(false)
            }, async () => {
                const url = await uploadTask.getDownloadURL();
              await  db.collection('channels').doc(channelId).set({
                    channelName,
                    profileUrl: url,
                    createdBy: user.uid,
                    createdAt:  firebase.firestore.FieldValue.serverTimestamp()
                }).then(async() => {
                    setloading(false);
                   await addUser()
                    setloading(false);
                    history.push(`/channel/${channelId}`)
                    setOpen(false)
                }).catch(err => {
                   console.log(err)
                })
            })
        }
        else{
            db.collection('channels').doc(channelId).set({
                channelName,
                profileUrl: '',
                createdBy: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(async() => {
               await  addUser()
                setloading(false);
                history.push(`/channel/${channelId}`)
                setOpen(false)
            }).catch(err => {
                console.log(err)
                setloading(false)
            })
            setOpen(false)
        }
    }
  }

  return (
    <div className="newChannel ">
      <Dialog fullWidth={true}
        maxWidth='sm' className="dialog" open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
           <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Create A New Channel" {...a11yProps(0)} />
                <Tab label="Join An  Existing Channel" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
       
        <TabPanel value={value} index={0}  className="dialog">
                    <DialogContent>
                          <div className="row">
                              <div className="col-xs-12 col-sm-4">
                              <input
                                accept="image/*"
                                style={{display: "none"}}
                                id="contained-button-file"
                                onChange={handleChangeImage}
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <IconButton variant="contained" color="primary" component="span">
                                <Avatar component="span" style={{width: '150px', height: '150px'}} src={profile}/>
                                </IconButton>
                            </label>
                            {uploadErr && <div className="text-danger">{uploadErr}</div>}
                              </div>
                              <div className="col-xs-12 col-sm-8">
                              <TextField  aria-readonly fullWidth value={channelId} id="outlined-basic" label="Channel Id" variant="outlined"  helperText="Share this to invite others" />
                              </div>
                          </div>
                            <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          error= {channelName === ''}
                          value={channelName}
                          onChange={e => setchannelName(e.target.value)}
                          label="Channel Name"
                          type="text"
                          helperText="Field is required."
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                            <Button variant="contained" color="secondary" onClick={() => setOpen(false)} >
                              Cancel
                            </Button>
                            <div className="loading__buttonContainer">
                            <Button variant="contained" color="primary" disabled={loading}  onClick={handleUpload} >
                              Create
                            </Button>
                              {loading &&  <div className="spinner-border ml-auto button__loading" role="status" aria-hidden="true"></div>}
                            </div>
                      </DialogActions>
        </TabPanel>
        <TabPanel  className="dialog" value={value} index={1}>
            <DialogContent>
                <TextField  fullWidth value={channelCode} onChange={(e) => setchannelCode(e.target.value)} id="outlined-basic" label="Channel Id" variant="outlined"  helperText="Enter the  Channel Code " />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={() => setOpen(false)} >
                  Cancel
                </Button>
                <div className="loading__buttonContainer">
                <Button variant="contained" color="primary" disabled={loading}  onClick={handleJoinChannel} >
                  Join
                </Button>
                  {loading &&  <div className="spinner-border ml-auto button__loading" role="status" aria-hidden="true"></div>}
                </div>
           </DialogActions>
        </TabPanel>
         
      </Dialog>
    </div>
  );
}