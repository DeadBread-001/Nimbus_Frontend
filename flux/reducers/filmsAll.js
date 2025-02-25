import {
  FILMS_ALL_ERROR,
  FILMS_ALL_REQUEST,
  FILMS_ALL_SUCCESS,
} from "../actions/filmsAll.js";

const initialState = {
  filmsAllRequest: false,
  filmsAllSuccess: false,
  filmsAllError: false,
  error: null,
  films: null,
};

export const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILMS_ALL_REQUEST:
      return { ...state, filmsAllRequest: true };
    case FILMS_ALL_SUCCESS:
      return {
        ...state,
        filmsAllRequest: false,
        films: action.payload,
        filmsAllSuccess: true,
        filmsAllError: false,
        error: null,
      };
    case FILMS_ALL_ERROR:
      return {
        ...state,
        filmsAllRequest: false,
        filmsAllSuccess: false,
        filmsAllError: true,
      };
    default:
      return state;
  }
};
