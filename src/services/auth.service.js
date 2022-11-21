export const URL = 'https://leaflet.propzdev3.name/';

const goLogin = (login, password) => {
    performLogin(login, password).then((res) => {
        if (res.url.includes('auth=fail')) {
            return new Promise((_, reject) => {
                reject();
            })
        } else {
            localStorage.setItem("user", JSON.stringify(res));
            return res;
        }
    });
}

const performLogin = (login, password) => {
    const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: "login=" + login + "&password=" + password
    };
    return fetch(URL + '/login', requestParams)
    .then((res) => {
        if (res.url.includes('auth=fail')) {
            return new Promise((_, reject) => {
                reject();
            })
        } else {
            localStorage.setItem("isAuthenticated", "true");
            return res;
        }
    });
}

const logout = () => {
    const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    
    localStorage.removeItem("user");

    return fetch(URL + '/login/logout', requestParams);
}

export default {
    performLogin,
    goLogin,
    logout
}
