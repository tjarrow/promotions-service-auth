import { SHOW_LOGIN_MODAL,
        SHOW_REGISTER_MODAL,
        HIDE_LOGIN_MODAL,
        HIDE_REGISTER_MODAL
      } from "../actions/types";

const initialState = {
    modal: false,
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
      case SHOW_LOGIN_MODAL:
        return {
          ...state,
          loginModal: true,
        };
      case HIDE_LOGIN_MODAL:
        return {
          ...state,
          loginModal: false,
        };
      case SHOW_REGISTER_MODAL:
        return {
          ...state,
          registerModal: true
        }  
      case HIDE_REGISTER_MODAL:
        return {
          ...state,
          registerModal: false
        }   
      default:
        return state;
    }
  }