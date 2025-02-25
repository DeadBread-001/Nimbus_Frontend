import { fetchRequest, IP } from "./fetch.js";
import { timeConvert } from "../utils/timeConvert.js";

/**
 * Выполняет поиск с заданными параметрами.
 * @param {Object} params - Объект параметров поиска.
 * @param {number} params.page - Номер страницы.
 * @param {string} params.string - Строка для поиска.
 * @param {string} params.findBy - Поле для поиска.
 */
export async function searchRequest(params) {
  try {
    const response = await fetchRequest(
      `${IP}/films/find/long?p=${params.page}&s=${params.string}&fb=${params.findBy}`,
      "GET",
    );
    const searchData = await response.json();
    if (!searchData || typeof searchData !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }
    if (searchData.films) {
      searchData.films.forEach((film) => {
        film.duration = timeConvert.timeIntoText(film.duration);
        film.date = timeConvert.dateIntoYear(film.date);
      });
      return searchData;
    }
    if (searchData.actors) {
      searchData.actors.forEach((actor) => {
        actor.birthday = timeConvert.dateIntoYear(actor.birthday);
      });
    }
    return searchData;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
