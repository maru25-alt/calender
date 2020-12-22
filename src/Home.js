import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';
import axios from './axios';
import db, {auth, timestamp} from './firebase';

function Home({user, setUser}) {
    const [value, onChange] = useState(new Date());
    const [email, setemail] = useState("");
    const {register, handleSubmit, errors } = useForm();
    const [open, setopen] = useState(false);
    const [emails, setEmails] = useState([]);
    const [view, setView] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadingEmails, setloadingEmails] = useState(false)

    useEffect(() => {
        setloadingEmails(true);
     db.collection('messages')
       //.orderBy("sentAt", "desc")
       .onSnapshot(snapshot => {
           console.log(snapshot)
        setEmails(snapshot.docs.map(doc => doc.data()));
       
      })
      setloadingEmails(false)
    }, [])


    const handleSignout = () => {
        auth.signOut().then(() => {
             setUser(null)
        })
    }

    const handleSendEmail = () => {
      console.log(value);
      setloading(true);
      axios.post('/api/send_email', {
          email: email,
          calendar: value.toString()
      }).then(res => {
          db.collection('messages').add({
              email: email,
              calender: value,
              sendAt: timestamp
          }).then(() => {
            toast.success("email  sent" , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
            setemail("");
            setloading(false)
          })
      }).catch(err => {
          console.log(err);
          setloading(false)
          toast.error("sorry something when wrong , email not send" , {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        }); 
      })
    }

    return (
        <div >
            <nav className="navbar">
                <div className="dropdown">
                <button className="nav-item"  onClick={() => setView(!view)} >
                   {view ? "View Emails" : "Send Email"}
                </button>
                    <div className="">
                            <img src={user.photoURL} onClick={() => setopen(!open)} className="dropdown-toggle avatar" id="dropdownMenuButton" data-bs-toggle="" aria-expanded="false" alt=""/>
                            <ul className="dropdown-menu" style={{display: open ? "block" : "none"}} aria-labelledby="dropdownMenuButton">
                                <li><img src={user.photoURL} width="200" height="200" className="avatar" alt="user" /></li>
                                <li className="dropdown-item">{user.displayName}</li>
                                <li className="dropdown-item">{user.email}</li>
                                <li className="dropdown-item"><button onClick={handleSignout} className="btn btn-danger">Logout</button></li>
                            </ul>
                    </div>
                </div>
            </nav>
  
           {!view ? 
            <form className="container form" onSubmit={handleSubmit(handleSendEmail)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div   className="form-control" >
                    <input 
                    ref={register({ required: true,  pattern:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                    type="email" 
                    placeholder="Enter Email" 
                    name="email"  
                    value={email} 
                    onChange={e => setemail(e.target.value)}/>
                      {errors.email && <span className="text-danger">Valid email is required</span>}
                    </div>
                </div>
                <div className="centered">
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <button className="send-btn"> {loading && <i class="fa fa-spinner fa-spin"></i>} Send Email</button>
            </form>
             :
            <table className="container results">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Calender Item</th>
                  </tr>
                </thead>
                
                    <tbody>
                    {emails && emails.map((email, index) => 
                        <tr key={index}>
                        <td>{(email?.sendAt.toDate()).toUTCString()}</td>
                        <td>{email?.email}</td>
                        <td>{(email?.calender.toDate()).toUTCString()}</td>
                        </tr>
                    )}
                   </tbody>
              
            </table>
           }
        </div>
    )
}

export default Home
