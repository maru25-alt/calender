import React, {useEffect, useState} from 'react';
import './App.css';
import Home from './Home';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux'
import Login from './Login';
import Signup from './Signup';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth } from './firebase';
import {SignedOutRoutes, SignedInRoutes} from './ProtectedRoutes';

function App() {
  const user = useSelector(selectUser)
 const [authUser, setauthUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          setauthUser(user)
      }
    })
  }, [])
  return (
    <div className="app">
      <Router>
      <ToastContainer/>
        <Switch>
                <Route path="/signin" exact component={Login}/>
                {/* <Route path="/signup" component={Signup}/> */}
                <SignedOutRoutes isAuth={user}  component={Signup} path="/signup"/>
                <SignedOutRoutes isAuth={user}  component={Login} path="/signin"/>
                <SignedInRoutes  isAuth={authUser}  component={Home} path="/"/>
                <Redirect path="*" to="/"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
