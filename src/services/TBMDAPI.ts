import axios from "axios";



const BASE_URL = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";
const API_KEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': API_KEY  
    },
});



