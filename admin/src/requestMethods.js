import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://ecomm-api-1vp8.onrender.com/api/";

// const __currentUser = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
// const TOKEN = __currentUser ? __currentUser.accessToken : '';
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    // headers: { token: `Bearer ${TOKEN}` }
});