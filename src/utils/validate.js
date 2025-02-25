export const validators = {
  /**
   * Проверка валидности почты
   * @function
   * @param {string} login - почта
   * @return {boolean} - флаг правильности почты
   */
  login: (login = "") => validateEmail(login),
  /**
   * Проверка валидности имени пользователя
   * @function
   * @param {string} username - имя пользователя
   * @return {boolean} - флаг правильности имени пользователя
   */
  username: (username) => validateUsername(username),
  /**
   * Проверка валидности пароля
   * @function
   * @param {string} password - пароль
   * @return {boolean} - флаг правильности пароля
   */
  password: (password) => validatePassword(password),
  /**
   * Проверка ввода подтверждения пароля, совпадающего с паролем
   * @function
   * @param {string} password - Пароль
   * @param {string} passConf - подтверждение пароля
   * @return {boolean} - флаг правильности почты
   */
  passwordConf: (password, passConf) => passwordConf(password, passConf),
};

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSW_LENGTH = 6;

const loginRegular = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = (email = "") => {
  return loginRegular.test(email);
};

const validateUsername = (username) => {
  return username.length >= MIN_USERNAME_LENGTH;
};

const validatePassword = (password) => {
  return password.length >= MIN_PASSW_LENGTH;
};

const passwordConf = (password, passConf) => {
  return password === passConf;
};
