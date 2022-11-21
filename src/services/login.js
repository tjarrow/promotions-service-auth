import appState from "../state/state";

export const URL = 'https://leaflet.propzdev3.name/';

export const goLogin = (login, password) => {
    performLogin(login, password).then((res) => {
        if (res.url.includes('auth=fail')) {
            appState.isLoginErrorShown = true;
        } else {
            appState.isAuthenticated = true;
            let url = window.location.origin +
                window.location.pathname +
                "/#cadastro-form";
            console.log('login success url: ', url);
            window.location.href = url;
        }
    });
}
const performLogin = (login, password) => {
    const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: "login=" + login + "&password=" + password
    };
    return fetch(URL + '/login', requestParams);
}

