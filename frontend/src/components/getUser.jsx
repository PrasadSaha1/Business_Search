// This gets information about a user
import { ACCESS_TOKEN } from '../constants';
import api from '../api';

export const getUser = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return null;

    const res = await api.post('https://business-search-s130.onrender.com/api/user_view/', {
        email: email,
    });

    const data = await res.json();
    return data;  // looks like { username: "...", email: "...", ... }

};
