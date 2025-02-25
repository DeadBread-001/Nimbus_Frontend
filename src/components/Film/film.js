import * as filmApi from "../../api/film.js";
import template from "./Film.hbs";
import Router from "../../utils/router.js";
import store, { getCookie } from "../../index.js";
import { getFilmData } from "../../../use-cases/film.js";
import { FILM_REDUCER } from "../../../flux/actions/film.js";
import {NOTIFICATION_TYPES, showNotification} from "../Notification/notification.js";
import {
  addToFavorite,
  getFavouritesFilms, isSubscribed,
  removeFromFavorite,
} from "../../api/profile.js";
import { IN_FAVOUTITES, NOT_IN_FAVOUTITES } from "../../img/imgConstants.js";
import { renderSeriesBlock } from "../components/episodesBlock/seriesBlock";
import * as authApi from "../../api/auth";
import { renderCommentsBlock } from "../components/commentsBlock/commentsBlock";
import * as profileApi from "../../api/profile.js";

/**
 * Отображает страницу фильма с указанным идентификатором.
 * @param {string} filmId - Идентификатор фильма.
 * @return {void}
 */
export async function renderFilmPage(filmId) {
  const [filmActors] = await Promise.all([filmApi.getActors(filmId)]);

  store.clearSubscribes();
  const actorSection = document.createElement("section");
  actorSection.classList.add("actor-section");
  let filmData;
  await getFilmData(filmId);
  store.subscribe(FILM_REDUCER, () => {
    filmData = store.getState().film.data.film;
  });
  await getFilmData(filmId);
  let inFavorites;
  const profileId = getCookie("user_uuid");
  if (profileId !== undefined) {
    const filmsData = await getFavouritesFilms(profileId);
    if (filmsData) {
      filmsData.forEach((film) => {
        if (film.uuid === filmId) {
          inFavorites = true;
        }
      });
    }
  }
  const isUserSub = await isSubscribed(profileId);
  if (isUserSub){
    filmData.withSubscription = false;
  }
  document.querySelector("main").innerHTML = template({
    ...filmData,
    filmActors,
    inFavorites,
  });

  const actorCards = document.querySelectorAll("[data-actor-id]");
  actorCards.forEach((actorCard, index) => {
    actorCard.addEventListener("click", () => {
      Router.goToActorPage(actorCard.dataset.actorId, filmActors[index].name);
    });
  });

  const favouritesButton = document.querySelector("#favourites-button");
  favouritesButton.addEventListener("click", async () => {
    const isAuthorized = await authApi.check();
    if (isAuthorized) {
      const uuid = getCookie("user_uuid");
      const requestData = {
        filmUuid: filmId,
        userUuid: uuid,
      };

      if (!(await addToFavorite(requestData))) {
        await removeFromFavorite(requestData);
        favouritesButton.innerHTML = NOT_IN_FAVOUTITES;
      } else {
        favouritesButton.innerHTML = IN_FAVOUTITES;
      }
    } else {
      showNotification({message: "Для этого нужно быть авторизованным", toastType: NOTIFICATION_TYPES.DANGER});
    }
  });

  const genreCards = document.querySelectorAll("[data-genre-uuid]");

  genreCards.forEach((genreCard) => {
    genreCard.addEventListener("click", () => {
      Router.goToGenrePage(
        genreCard.dataset.genreUuid,
        genreCard.dataset.genreNameRu,
      );
    });
  });

  const commentsBlock = document.querySelector(".comments-block");
  renderCommentsBlock(commentsBlock, filmId);

  const playerButton = document.querySelector(".accent-button");
  if (!filmData.isSerial) {
    playerButton.addEventListener("click", async (e) => {
      const isAuthorized = await authApi.check();
      const isSubscribed = profileApi.isSubscribed;

      if (filmData.withSubscription && !isSubscribed) {
        Router.goToSubcriptionPage();
      } else if (isAuthorized) {
        e.preventDefault();
        Router.goToPlayerPage(filmId, filmData.title, filmData.link);
      } else {
        showNotification({message:"Для этого нужно быть авторизованным", toastType: NOTIFICATION_TYPES.DANGER});
      }
    });
    return;
  }

  const seriesBlockParent = document.querySelector(".film-content-block__left");
  renderSeriesBlock(seriesBlockParent, filmData.seasons, filmId);

  playerButton.addEventListener("click", async (e) => {
    const isAuthorized = await authApi.check();
    if (isAuthorized) {
      e.preventDefault();
      Router.goToPlayerPage(
        filmId,
        filmData.title,
        filmData.seasons[0]?.series[0]?.link,
        filmData.seasons[0]?.series,
      );
    } else {
      showNotification({message: "Для этого нужно быть авторизованным", toastType: NOTIFICATION_TYPES.DANGER});
    }
  });
}
