import React, {useState} from 'react'
import db, { auth, provider } from './firebase'
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';
import './Login.css'
import { Button } from '@material-ui/core';
    // eslint-disable-next-line

function Signup({history}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [disabled, setdisabled] = useState(false)
    const {register, handleSubmit, errors } = useForm();
   
    const handleSignup = () => {
        setdisabled(true) 
        auth.createUserWithEmailAndPassword(email, password).then( async(res) => {
           await res.user.updateProfile({
                displayName: username
            });
           await db.collection('users').doc(res.user.uid).set({
               displayName: username,
               userID: res.user.uid,
               email: email   
           })
            toast.success(res.data , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
            setdisabled(false);
            localStorage.setItem('isLogged' , res.user.uid)
            history.push('/')

        }).catch(err => {
            toast.error(err.message , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
            setdisabled(false)   
        })
    }

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then( async(res) => {
          await db.collection('users').doc(res.user.uid).set({
                displayName: res.user.displayName,
                userID: res.user.uid,
                email: res.user.email 
            })
            toast.success("successfully login" , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
            localStorage.setItem('isLogged' , res.user.uid) 
            history.push('/')
        })
        .catch((err) => 
            {
                toast.error(err.message , {
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
        <div className='login'>
            <form  onSubmit={handleSubmit(handleSignup)}>
            <div className="login__logo">
                <h2>Welcome to Collabo-Chat </h2>
                <p className="text-center">Create your account</p>
            </div>
                 <div className="form-group row">
                     <label className="col-sm-3 col-form-label" htmlFor="lastname">Username</label>
                     <div className="col-sm-9">
                          <input name="username" ref={register({ required: true })} value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" type="" placeholder="Username"></input>
                          {errors.username && <span className="text-danger">Username is required</span>}
                     </div> 
                 </div>
                <div className="form-group row">
                     <label className="col-sm-3 col-form-label" htmlFor="email">Email</label>
                     <div className="col-sm-9">
                          {/* eslint-disable-next-line */}
                          <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={register({ required: true, pattern: `/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ `})} className="form-control" type="email" placeholder="Email"></input>
                          {errors.email && <span className="text-danger">Valid email is required</span>}
                     </div> 
                 </div>
                 <div className="form-group row">
                     <label className="col-sm-3 col-form-label" htmlFor="password">Password</label>
                     <div className="col-sm-9">
                          <input name="password" ref={register({ required: true, minLength: 6  })} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" type="password"></input>
                          {errors.password && <span className="text-danger">At least 6 characters password  is required</span>}
                     </div>
                 </div>
                 <div className="offset-3 col-sm-9 submit__button">
                        <button disabled={disabled} className="btn  form-control signin-button" type="submit"> Signup</button>
                        {disabled &&  <div className="spinner-border ml-auto button__loading" role="status" aria-hidden="true"></div>}      
                 </div>
                   <div>
                       <a href="/signin">Don't have an account, click here to signup</a>
                   </div>
              </form>
            <Button className="google__btn" onClick={signIn}>
            <img width="30" src="https://beginnersbook.com/wp-content/uploads/2013/09/Google-plus-icon-300x300.png" alt=""/>
                 Signin with Google
                 </Button>
        </div>
    )
}

export default Signup
