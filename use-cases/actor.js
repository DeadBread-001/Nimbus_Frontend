import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import {
  actorError,
  actorRequest,
  actorSuccess,
} from "../flux/actions/actor.js";
import { fixActorData } from "../src/utils/transformers/filmDataWithDuration";

/**
 * Получает данные об актере по его UUID.
 * @param {string} uuid UUID актера для получения данных.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getActorData(uuid) {
  try {
    store.dispatch(actorRequest());
    const response = await fetchRequest(`${IP}/actors/${uuid}/data`, "GET");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    data.actor = fixActorData(data.actor);
    store.dispatch(actorSuccess(data));
  } catch (error) {
    store.dispatch(actorError());
  }
}
