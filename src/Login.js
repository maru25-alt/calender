import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import {toast} from 'react-toastify';

const Login = () => {
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
        <div className='login' >
            <div>
                <div className="login__heading">
                    <h1>Welcome to app</h1>
                    <p className="">Create your account</p>
                </div>
                <Button onClick={signIn}> 
                <img width="30" src="https://beginnersbook.com/wp-content/uploads/2013/09/Google-plus-icon-300x300.png" alt=""/>
                Signin with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
