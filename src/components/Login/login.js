import { validators } from "../../utils/validate.js";
import * as authApi from "../../api/auth.js";
import { menu } from "../../index.js";
import template from "./Login.hbs";
import Router from "../../utils/router.js";

/**
 * Рендерит страницу входа в систему, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для аутентификации пользователя.
 * @function
 * @return {void}
 */
export function renderLogin() {
  document.querySelector("main").innerHTML = template();

  const form = document.querySelector(".form-section");
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const user = { login, password };

    if (!validators.login(login)) {
      const errorField = document.getElementById("login-errors");
      errorField.innerText = "Поле почта введено некорректно";
    }

    const isAuthorized = await authApi.login(user);
    await menu.renderAuth(isAuthorized);
    if (isAuthorized) {
      await Router.goToHomePage();
      return;
    }

    const errorField = document.getElementById("login-errors");
    errorField.innerText = "Неверная почта или пароль";
  });
}
