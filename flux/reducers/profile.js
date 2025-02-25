import {
  PROFILE_ERROR,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../actions/profile.js";

const initialState = {
  profileRequest: false,
  profileSuccess: false,
  profileError: false,
  error: null,
  profileData: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, profileRequest: true };
    case PROFILE_SUCCESS:
      return {
        ...state,
        profileRequest: false,
        profileData: action.payload,
        profileSuccess: true,
        profileError: false,
        error: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profileRequest: false,
        profileSuccess: false,
        profileError: true,
      };
    default:
      return state;
  }
};
