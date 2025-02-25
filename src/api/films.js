import { fetchRequest, IP } from "./fetch.js";
import { toFilmDataWithDuration } from "../utils/transformers/filmDataWithDuration.js";

/**
 * Запрос на получение массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
export async function getAll() {
  try {
    const url = IP + "/films/all";
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает информацию о четырех лучших фильмах.
 * @async
 * @return {Promise<Array<Object>>} Промис, который разрешается массивом объектов с данными о фильмах.
 * @throws {Error} Если происходит ошибка при получении данных.
 */
export async function getTopFour() {
  try {
    const url = IP + "/films/top";
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает информацию о четырех лучших фильмах.
 * @async
 * @return {Promise<Array<Object>>} Промис, который разрешается массивом объектов с данными о фильмах.
 * @throws {Error} Если происходит ошибка при получении данных.
 */
export async function getFilmsWithSubscription() {
  try {
    const url = IP + "/films/all_sub";
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает список жанров фильмов.
 * @async
 * @return {Promise<Array<string>>} Промис, который разрешается массивом строк - названий жанров.
 * @throws {Error} Если произошла ошибка при получении данных.
 */
export async function getGenres() {
  try {
    const url = IP + "/films/genres/preview";
    const response = await fetchRequest(url, "GET");

    const genresData = await response.json();

    if (!genresData || !genresData.genres) {
      throw new Error("Ошибка: ответ не содержит массива жанров");
    }

    return genresData.genres;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает список фильмов определенного жанра.
 * @param {string} genreUuid - Идентификатор жанра.
 * @return {Promise<object[]>} - Возвращает массив объектов с данными о фильмах.
 */
export async function getFilmsOfGenre(genreUuid) {
  try {
    const url = IP + `/films/genres/${genreUuid}/all`;
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массива фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
