import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com', // Replace with your API base URL
})

export default api;