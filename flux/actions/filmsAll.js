export const FILMS_ALL_REQUEST = "FILMS_ALL_REQUEST";

export const FILMS_ALL_SUCCESS = "FILMS_ALL_SUCCESS";

export const FILMS_ALL_ERROR = "FILMS_ALL_ERROR";

export const FILMS_REDUCER = "FILMS_REDUCER";

export const filmsAllRequest = () => ({
  type: FILMS_ALL_REQUEST,
  reducerName: FILMS_REDUCER,
});

export const filmsAllSuccess = (films) => ({
  type: FILMS_ALL_SUCCESS,
  payload: films,
  reducerName: FILMS_REDUCER,
});

export const filmsAllError = (error) => ({
  type: FILMS_ALL_ERROR,
  payload: { isError: true, error: error },
  reducerName: FILMS_REDUCER,
});
