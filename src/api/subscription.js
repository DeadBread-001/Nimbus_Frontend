import { fetchRequest, IP } from "./fetch";

/**
 * Запрос на покупку подписки
 * @function
 * @return {Object} - Объект запроса
 * @param {string} uuid - uuid профиля
 * @param {Object} body
 */
export async function buySubscription(uuid, body) {
  try {
    const response = await fetchRequest(
      `${IP}/profile/${uuid}/subscriptions/pay`,
      "POST",
      body,
    );
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return data.link;
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}

/**
 * отправка запроса на подписки
 * @function
 * @return {Promise}
 */
export async function getSubscriptions() {
  try {
    const url = IP + "/subscriptions/get";
    const response = await fetchRequest(url, "GET");
    const responseData = await response.json();
    if (!responseData || typeof responseData !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return responseData.subscriptions;
  } catch (error) {
    console.error("Произошла ошибка в logout:", error.message);
  }
}
