// This gets information about a user
import { ACCESS_TOKEN } from '../constants';

export const getUser = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return null;

    const res = await fetch("https://business-search-s130.onrender.com/api/user_view/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;  // { username: "...", email: "...", ... }

};
