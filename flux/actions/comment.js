export const COMMENT_REQUEST = "COMMENT_REQUEST";

export const COMMENT_SUCCESS = "COMMENT_SUCCESS";

export const COMMENT_ERROR = "COMMENT_ERROR";

export const COMMENT_REDUCER = "COMMENT_REDUCER";
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @return {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const CommentRequest = () => ({
  type: COMMENT_REQUEST,
  reducerName: COMMENT_REDUCER,
});
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @return {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const CommentSuccess = (info) => ({
  type: COMMENT_SUCCESS,
  payload: info,
  reducerName: COMMENT_REDUCER,
});
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @return {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const CommentError = (error) => ({
  type: COMMENT_ERROR,
  payload: { isError: true, error: error },
  reducerName: COMMENT_REDUCER,
});
