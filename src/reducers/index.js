import { combineReducers } from "redux";
import auth from "./auth";
import modalReducer from "./modal.js";
import register from "./register";

export default combineReducers({
    auth,
    modalReducer,
    register
});
