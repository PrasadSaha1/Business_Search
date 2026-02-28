import { ACCESS_TOKEN } from '../constants';

export const isAuthenticated = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return !!token; // returns true if logged in
};

/*
import api from '../api';

export const isAuthenticated = async () => {
    const res = await api.get(`https://business-search-s130.onrender.com/api/check_login/`);
    console.log(res.data.logged_in)
    return res.data.logged_in
};
*/