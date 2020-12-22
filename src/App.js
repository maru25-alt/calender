import React, {useEffect, useState} from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [user, setauthUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          setauthUser(user)
      }
    })
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      {user ? 
      <Home user={user} setUser={setauthUser}/> : <Login/>}
    </div>
  );
}

export default App;
