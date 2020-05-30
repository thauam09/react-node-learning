import axios from 'axios';
import oauth from 'axios-oauth-client';

const api = axios.create({
    baseURL: 'https://api.github.com/',
});

export default api;