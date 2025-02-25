export const CHANGE_USERNAME_ACTION = "chUsername";
export const CHANGE_PASSWORD_ACTION = "chPassword";
export const CHANGE_AVATAR_ACTION = "chAvatar";

export const ACTOR_REQUEST = "ACTOR_REQUEST";
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const ACTOR_SUCCESS = "ACTOR_SUCCESS";
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const ACTOR_ERROR = "ACTOR_ERROR";

export const ACTOR_REDUCER = "ACTOR_REDUCER";
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @return {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const actorRequest = () => ({
  type: ACTOR_REQUEST,
  reducerName: ACTOR_REDUCER,
});
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @return {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const actorSuccess = (info) => ({
  type: ACTOR_SUCCESS,
  payload: info,
  reducerName: ACTOR_REDUCER,
});
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @return {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const actorError = (error) => ({
  type: ACTOR_ERROR,
  payload: { isError: true, error: error },
  reducerName: ACTOR_REDUCER,
});
