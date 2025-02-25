import { fetchRequest, IP } from "./fetch.js";

/**
 * Выполняет запрос на отправку отзыва.
 * @param {object} data UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function sendComment(data) {
  try {
    const url = IP + "/films/comments/add";
    const response = await fetchRequest(url, "POST", data);
    const responseData = await response.json();

    return responseData.status < 300;
  } catch (error) {
    console.error("Произошла ошибка", error.message);
  }
}

/**
 * Выполняет запрос на получение данных конкретного фильма по его UUID.
 * @param {string} uuid UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getCommentData(uuid) {
  try {
    const response = await fetchRequest(`${IP}/films/${uuid}/comments`, "GET");
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}

/**
 * Выполняет запрос на удаление отзыва.
 * @param {object} requestData UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function deleteComment(requestData) {
  try {
    const url = IP + "/films/comments/remove";
    const response = await fetchRequest(url, "POST", requestData);
    const responseData = await response.json();

    return responseData.status < 300;
  } catch (error) {
    console.error("Произошла ошибка", error.message);
  }
}
