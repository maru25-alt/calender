import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:5000' //'https://calendaremailsent.herokuapp.com/'
})

export default instance;