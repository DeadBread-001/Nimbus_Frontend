import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import {
  profileError,
  profileRequest,
  profileSuccess,
} from "../flux/actions/profile.js";
import { fixUserData } from "../src/utils/transformers/filmDataWithDuration";

/**
 * Получает данные профиля пользователя по его идентификатору.
 * @param {string} uuid - Идентификатор пользователя.
 */
export async function getProfileData(uuid) {
  try {
    store.dispatch(profileRequest());
    const response = await fetchRequest(`${IP}/profile/${uuid}/data`, "GET");
    const data = await response.json();
    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }
    data.user.avatar = `data:image/png;base64,${data.user.avatar}`;
    data.user = fixUserData(data.user);
    store.dispatch(profileSuccess(data));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(profileError());
  }
}
