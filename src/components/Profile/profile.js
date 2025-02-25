import * as profileApi from "../../api/profile.js";
import { validators } from "../../utils/validate.js";
import profileTemplate from "./Profile.hbs";
import editFormTemplate from "./editForm.hbs";
import Router from "../../utils/router.js";
import store, { menu } from "../../index.js";
import { getProfileData } from "../../../use-cases/profile.js";
import { PROFILE_REDUCER } from "../../../flux/actions/profile.js";
import { addSliderHandler } from "../../utils/slider.js";
import {NOTIFICATION_TYPES, showNotification} from "../Notification/notification.js";
import { getFavouritesFilms } from "../../api/profile.js";

/**
 * Отображает профиль пользователя на странице.
 * @param {string} profileId Идентификатор профиля пользователя.
 */
export async function renderProfile(profileId) {
  const filmsData = await getFavouritesFilms(profileId);
  let profileData;
  await getProfileData(profileId);
  store.subscribe(PROFILE_REDUCER, () => {
    profileData = store.getState().profile.profileData.user;
  });
  await getProfileData(profileId);

  const profilePageData = { ...profileData, filmsData };
  document.querySelector("main").innerHTML = profileTemplate(profilePageData);

  document
    .querySelector(".profile-info__buttons")
    .addEventListener("click", (e) => {
      e.preventDefault();
      renderEditForm(profileId);
    });

  const filmCards = document.querySelectorAll("[data-film-id]");

  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
    });
  });

  addSliderHandler();
}

/**
 * Отображает форму редактирования профиля
 * @param {string} profileId Идентификатор профиля, который редактируется.
 */
export async function renderEditForm(profileId) {
  document.querySelector(".profile-info").innerHTML = editFormTemplate();

  const usernameButton = document.querySelector("#sendLoginBtn");
  const avatarButton = document.querySelector("#sendImageBtn");
  const passwordButton = document.querySelector("#sendPasswordBtn");
  const exitButton = document.querySelector("#exit-editing-button");

  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const avatarInput = document.querySelector('input[name="avatar"]');

  usernameButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!validators.username(usernameInput.value)) {
      showNotification({ message: "Имя пользователя слишком короткое", toastType: NOTIFICATION_TYPES.DANGER});
      return;
    }

    const data = new FormData();
    data.append("action", profileApi.CHANGE_USERNAME_ACTION);
    data.append("newData", usernameInput.value);

    if (await profileApi.editProfile(profileId, data)) {
      renderProfile(profileId);
    }
  });

  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/") || file.type.startsWith("image/svg")) {
      showNotification({
        message: "Неправильный формат файла. Пожалуйста, выберите изображение (например, JPEG или PNG).",
        toastType: NOTIFICATION_TYPES.DANGER}
      );
      avatarInput.value = "";
      return;
    }
  });

  avatarButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const avatar = avatarInput.files[0];

    const data = new FormData();
    data.append("action", profileApi.CHANGE_AVATAR_ACTION);
    data.append("avatar", avatar);

    if (!avatar) {
      document.getElementById("avatar-errors").innerText = "Файл не выбран";
      return;
    }

    if (await profileApi.editProfile(profileId, data)) {
      showNotification({message: "Аватар пользователя обновлен", toastType: NOTIFICATION_TYPES.SUCCESS});
      renderProfile(profileId);
      menu.renderAuth(true);
    }
  });

  passwordButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!validators.password(passwordInput.value)) {
      showNotification({message: "Пароль слишком короткий", toastType: NOTIFICATION_TYPES.DANGER});
      return;
    }

    if (!validators.passwordConf(passwordInput.value, passConfInput.value)) {
      showNotification({message: "Пароли не совпадают", toastType: NOTIFICATION_TYPES.DANGER});
      return;
    }

    const data = new FormData();
    data.append("action", profileApi.CHANGE_PASSWORD_ACTION);
    data.append("newData", passwordInput.value);

    if (await profileApi.editProfile(profileId, data)) {
      renderProfile(profileId);
    }
  });

  exitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await renderProfile(profileId);
  });

  addSliderHandler();
}
