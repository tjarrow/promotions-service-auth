import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import RegisterService from '../services/register.service';

export const registerUser = (userData) => (dispatch) => {
    return RegisterService.getOrCreateUser(userData)
    .then(() => {
        dispatch({
            type: REGISTER_SUCCESS
        });
        return Promise.resolve();
    }, () => {
        dispatch({
            type: REGISTER_FAIL
        });
        return Promise.reject();
    })
}
