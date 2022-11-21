import { SHOW_LOGIN_MODAL,
        SHOW_REGISTER_MODAL,
        HIDE_LOGIN_MODAL,
        HIDE_REGISTER_MODAL
} from "./types";  
  
export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL,
  };
}
  
export function showRegisterModal() {
  return {
    type: SHOW_REGISTER_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL,
  };
}

export function hideRegisterModal() {
  return {
    type: HIDE_REGISTER_MODAL,
  };
}