export const CHANGE_USERNAME_ACTION = "chUsername";
export const CHANGE_PASSWORD_ACTION = "chPassword";
export const CHANGE_AVATAR_ACTION = "chAvatar";

export const FILM_REQUEST = "FILM_REQUEST_REQUEST";
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const FILM_SUCCESS = "FILM_SUCCESS";
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const FILM_ERROR = "FILM_ERROR";

export const FILM_REDUCER = "FILM_REDUCER";
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @return {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const FilmRequest = () => ({
  type: FILM_REQUEST,
  reducerName: FILM_REDUCER,
});
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @return {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const FilmSuccess = (info) => ({
  type: FILM_SUCCESS,
  payload: info,
  reducerName: FILM_REDUCER,
});
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @return {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const FilmError = (error) => ({
  type: FILM_ERROR,
  payload: { isError: true, error: error },
  reducerName: FILM_REDUCER,
});
