import { ACTOR_ERROR, ACTOR_REQUEST, ACTOR_SUCCESS } from "../actions/actor.js";

const initialState = {
  actorRequest: false,
  actorSuccess: false,
  actorError: false,
  error: null,
  info: null,
};

export const actorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTOR_REQUEST:
      return { ...state, actorRequest: true };
    case ACTOR_SUCCESS:
      return {
        ...state,
        actorRequest: false,
        info: action.payload,
        actorSuccess: true,
        actorError: false,
        error: null,
      };
    case ACTOR_ERROR:
      return {
        ...state,
        actorRequest: false,
        actorSuccess: false,
        actorError: true,
      };
    default:
      return state;
  }
};
