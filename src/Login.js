import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';

const Login = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const [disabled, setdisabled] = useState(false)

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((res) => {
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

    const handleSignin = () => {
        setdisabled(true)
        auth.signInWithEmailAndPassword(email, password).then(res => {
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
            setdisabled(false)   
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

    return (
        <div className='login' >
            <form  onSubmit={handleSubmit(handleSignin)}>
            <div className="login__logo text-center">
                <h2>Welcome back to Collabo-Chat </h2>
                <p>Sign in to your account</p>
            </div>
                 <div className="form-group row">
                     <label className="col-sm-3 col-form-label" htmlFor="email">Email</label>
                     <div className="col-sm-9">
                          <input name="email" ref={register({ required: true })} value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="" placeholder="Email"></input>
                          {errors.email && <span className="text-danger">Valid email is required</span>}
                     </div> 
                 </div>
                 <div className="form-group row">
                     <label className="col-sm-3 col-form-label" htmlFor="password">Password</label>
                     <div className="col-sm-9">
                          <input name="password" ref={register({ required: true })} onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder="Password" type="password"></input>
                          {errors.password && <span className="text-danger">Password  is required</span>}
                     </div>
                 </div>
                 <div className="offset-3 col-sm-9 submit__button">
                        <button  disabled={disabled} className="btn form-control signin-button" type="submit"> Log In</button>
                        {disabled &&  <div className="spinner-border ml-auto button__loading" role="status" aria-hidden="true"></div>}
                 </div>
                   <div>
                       <a href="/signup">Don't have an account, click here to signup</a>
                   </div>
              </form>
            <Button onClick={signIn}> 
            <img width="30" src="https://beginnersbook.com/wp-content/uploads/2013/09/Google-plus-icon-300x300.png" alt=""/>
              Signin with Google
            </Button>
        </div>
    )
}

export default Login
