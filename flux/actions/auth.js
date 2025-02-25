export const CHANGE_USERNAME_ACTION = "chUsername";
export const CHANGE_PASSWORD_ACTION = "chPassword";
export const CHANGE_AVATAR_ACTION = "chAvatar";

export const LOGIN_REQUEST = "LOGIN_REQUEST_REQUEST";
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGIN_REDUCER = "LOGIN_REDUCER";
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @return {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const LoginRequest = () => ({
  type: LOGIN_REQUEST,
  reducerName: LOGIN_REDUCER,
});
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @return {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const LoginSuccess = (info) => ({
  type: LOGIN_SUCCESS,
  payload: info,
  reducerName: LOGIN_REDUCER,
});
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @return {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const LoginError = (error) => ({
  type: LOGIN_ERROR,
  payload: { isError: true, error: error },
  reducerName: LOGIN_REDUCER,
});
