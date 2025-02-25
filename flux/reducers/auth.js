import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/auth.js";

const initialState = {
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
  error: null,
  films: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loginRequest: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        films: action.payload,
        loginSuccess: true,
        loginError: false,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginRequest: false,
        loginSuccess: false,
        loginError: true,
      };
    default:
      return state;
  }
};
