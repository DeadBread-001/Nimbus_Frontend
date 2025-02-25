import { validators } from "../../utils/validate.js";
import * as authApi from "../../api/auth.js";
import { changeActiveButton, menu } from "../../index.js";
import template from "./Signup.hbs";
import Router from "../../utils/router.js";

/**
 * Рендерит страницу регистрации, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для регистрации пользователя.
 * @async
 * @function
 * @return {void}
 */
export async function renderSignup() {
  document.querySelector("main").innerHTML = template();

  const form = document.querySelector(".form-section");
  const emailInput = document.querySelector('input[name="email"]');
  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const errorFields = document.getElementsByClassName(
    "form-section__error-signup",
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const username = usernameInput.value;
    const user = { password, login, username };

    if (!validators.login(login)) {
      errorFields[0].innerText = "Поле почта введено некорректно";
      return;
    } else {
      errorFields[0].innerText = "";
    }

    if (!validators.username(username)) {
      errorFields[1].innerText = "Имя пользователя слишком короткое";
      return;
    } else {
      errorFields[1].innerText = "";
    }

    if (!validators.password(password)) {
      errorFields[2].innerText = "Пароль слишком короткий";
      return;
    } else {
      errorFields[2].innerText = "";
    }

    if (!validators.passwordConf(password, passConf)) {
      errorFields[3].innerText = "Пароли не совпадают";
      return;
    } else {
      errorFields[3].innerText = "";
    }

    const isAuthorized = await authApi.signup(user);
    if (isAuthorized) {
      await menu.renderAuth(isAuthorized);
      changeActiveButton("/");
      await Router.goToHomePage();
    } else {
      errorFields[0].innerText = "Такой пользователь уже существует";
    }
  });
}
