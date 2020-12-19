import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import ChatDefaultView from './ChatDefaultView'
import './Home.css';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <Sidebar/>
            <Switch>
             <Route  path="/channel/:id" render={(props) => (<Chat {...props} />)}/>
             <Route path="/" component={ChatDefaultView}/>
             <Redirect from="*" to="/"/> 
            </Switch>
        </div>
    )
}

export default Home
