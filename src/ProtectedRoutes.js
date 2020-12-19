import React from 'react';
import {Route , Redirect} from 'react-router-dom'



export const SignedInRoutes = ({component: Component, path,  isAuth}) => {
    if(!localStorage.getItem('isLogged')) {
        return <Redirect to="/signin"/>
    }
    return <Route path={path} render={props  => <Component {...props}/>}/> 
}

export const SignedOutRoutes = ({component, path,  isAuth}) => {
    if(localStorage.getItem('isLogged')) {
        return <Redirect to="/"/>
    }
    return <Route path={path} component={component} />
}