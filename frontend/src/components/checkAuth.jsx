// Checks if a user is logged in by seeing if there's an access token

import { ACCESS_TOKEN } from '../constants';

export const isAuthenticated = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return !!token; // returns true if logged in
};
