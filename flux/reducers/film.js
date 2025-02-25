import { FILM_ERROR, FILM_REQUEST, FILM_SUCCESS } from "../actions/film.js";

const initialState = {
  filmRequest: false,
  filmSuccess: false,
  filmError: false,
  error: null,
  data: null,
};

export const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILM_REQUEST:
      return { ...state, filmRequest: true };
    case FILM_SUCCESS:
      return {
        ...state,
        filmRequest: false,
        data: action.payload,
        filmSuccess: true,
        filmError: false,
        error: null,
      };
    case FILM_ERROR:
      return {
        ...state,
        filmRequest: false,
        filmSuccess: false,
        filmError: true,
      };
    default:
      return state;
  }
};
