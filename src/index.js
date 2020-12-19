import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
//import * as serviceWorker from './serviceWorker';
import { auth } from './firebase';
import { login, logout } from './features/userSlice'


const main =  () => {
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      store.dispatch(login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName
      }))
    } else {
      store.dispatch(logout())
    }
  })
}

 main()
console.log('hello')
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
