import * as authApi from "../../api/auth.js";
import { changeActiveButton, menu } from "../../index.js";
import Router from "../../utils/router.js";

/**
 * Отправляет запрос на сервер для выхода из аккаунта,
 * обновляет отображение меню и перенаправляет
 * на страницу фильмов при успешном выходе.
 * @async
 * @function
 * @return {void}
 */
export async function renderLogout() {
  const isAuthorized = await authApi.logout();

  await menu.renderAuth();
  if (isAuthorized) {
    document.cookie =
      "user_uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    changeActiveButton("/");
    await Router.goToHomePage();
  }
}
