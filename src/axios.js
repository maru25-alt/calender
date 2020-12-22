import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://calendaremailsent.herokuapp.com/'
})

export default instance;