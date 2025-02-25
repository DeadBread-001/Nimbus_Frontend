import { fetchRequest, IP } from "./fetch.js";
import { timeConvert } from "../utils/timeConvert.js";

/**
 * Получает данные о фильме по его идентификатору.
 * @param {string} filmId - Идентификатор фильма.
 * @return {Promise<object>} - Возвращает объект с данными о фильме.
 */
export async function getFilmData(filmId) {
  try {
    const response = await fetchRequest(`${IP}/films/${filmId}/data`, "GET");
    const filmData = await response.json();

    if (!filmData || typeof filmData !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    filmData.film.duration = timeConvert.timeIntoText(filmData.film.duration);
    filmData.film.date = timeConvert.dateIntoYear(filmData.film.date);

    return filmData.film;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает список актеров фильма по его идентификатору.
 * @param {string} filmId - Идентификатор фильма.
 * @return {Promise<object[]>} - Возвращает массив объектов с данными об актерах фильма.
 */
export async function getActors(filmId) {
  try {
    const response = await fetchRequest(`${IP}/films/${filmId}/actors`, "GET");
    const filmActors = await response.json();

    if (!filmActors || typeof filmActors !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return filmActors.actors;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
