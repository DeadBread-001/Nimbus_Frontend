import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import {
  filmsAllError,
  filmsAllRequest,
  filmsAllSuccess,
} from "../flux/actions/filmsAll.js";
import { toFilmDataWithDuration } from "../src/utils/transformers/filmDataWithDuration.js";

/**
 * Выполняет запрос на получение данных всех фильмов.
 * @throws {Error} Если ответ не содержит массив фильмов или произошла ошибка при выполнении запроса.
 */
export async function FilmsAllRequest() {
  try {
    store.dispatch(filmsAllRequest());
    const response = await fetchRequest(`${IP}/films/all`);
    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    store.dispatch(filmsAllSuccess(toFilmDataWithDuration(filmsData.films)));
  } catch (error) {
    store.dispatch(filmsAllError(error));
    console.error("Произошла ошибка:", error.message);
  }
}
