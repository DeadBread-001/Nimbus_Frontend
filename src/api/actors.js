import { fetchRequest, IP } from "./fetch.js";
import { timeConvert } from "../utils/timeConvert";

/**
 * Запрос на получение данных об актере
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {Promise} promise - Объект запроса
 */
export async function getActorData(actorId) {
  try {
    const response = await fetchRequest(`${IP}/actors/${actorId}/data`, "GET");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    data.actor.birthday = timeConvert.dateIntoDayMonthYear(data.actor.birthday);

    return data.actor;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
