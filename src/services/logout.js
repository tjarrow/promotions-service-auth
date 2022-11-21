import { URL } from './login';
import appState from "../state/state";

export const logout = () => {
    const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    window.location.href = window.location.origin +
        window.location.pathname;

    appState.isAuthenticated = false;

    return fetch(URL + '/login/logout', requestParams);
}
