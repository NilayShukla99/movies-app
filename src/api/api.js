import axios from 'axios';

export default axios.create({
    baseUrl: 'https://movies-app-154a5-default-rtdb.firebaseio.com'
});