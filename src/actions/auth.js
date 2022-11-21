import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SHOW_LOGIN_MODAL,
} from "./types";

import AuthService from "../services/auth.service";

export const login = (username, password) => (dispatch) => {
    return AuthService.performLogin(username, password).then(
        () => {
            dispatch({
                type: LOGIN_SUCCESS,
            });
            return Promise.resolve();
        }, () => {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: SHOW_LOGIN_MODAL
            })
            return Promise.reject();
        }
    )
}

export const goLogout = (dispatch) => {
    return AuthService.logout().then(
        () => {
            dispatch({
                type: LOGOUT,
            });
        }
    )
}