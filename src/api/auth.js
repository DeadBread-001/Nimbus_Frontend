import { fetchRequest, IP } from "./fetch.js";

/**
 * проверка валидности сессии
 * @function
 * @return {boolean}
 */
export async function check() {
  try {
    const response = await fetchRequest(IP + "/auth/check", "POST");
    const responseData = await response.json();

    return responseData.status === 200 || responseData.status === 400;
  } catch (error) {
    console.error("Произошла ошибка в check:", error.message);
  }
}

/**
 * отправка запроса на вход
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
export async function login(user) {
  try {
    const url = IP + "/auth/login";
    const response = await fetchRequest(url, "POST", user);
    const responseData = await response.json();

    return responseData.status === 200;
  } catch (error) {
    console.error("Произошла ошибка в login:", error.message);
  }
}

/**
 * отправка запроса на регистрацию
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
export async function signup(user) {
  try {
    const url = IP + "/auth/signup";
    const response = await fetchRequest(url, "POST", user);
    const responseData = await response.json();

    return responseData.status < 300;
  } catch (error) {
    console.error("Произошла ошибка в signup:", error.message);
  }
}

/**
 * отправка запроса для удаления текущей сессии
 * @function
 * @return {Promise}
 */
export async function logout() {
  try {
    const url = IP + "/auth/logout";
    const response = await fetchRequest(url, "POST");
    const responseData = await response.json();

    return responseData.status === 200;
  } catch (error) {
    console.error("Произошла ошибка в logout:", error.message);
  }
}
