import * as filmsApi from "../../api/films.js";
import template from "./Films.hbs";
import { renderSlider } from "../Slider/renderSlider.js";
import Router from "../../utils/router.js";
import store from "../../index.js";
import { FILMS_REDUCER } from "../../../flux/actions/filmsAll.js";
import { FilmsAllRequest } from "../../../use-cases/filmsAll.js";
import { addSliderHandler } from "../../utils/slider.js";

/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  try {
    const [topFourFilms, filmsGenres, subscriptionFilms] = await Promise.all([
      filmsApi.getTopFour(),
      filmsApi.getGenres(),
      filmsApi.getFilmsWithSubscription(),
    ]);
    store.clearSubscribes();

    topFourFilms[0].active = "data-active";
    let filmData;
    await FilmsAllRequest();
    store.subscribe(FILMS_REDUCER, () => {
      filmData = store.getState().films.films;
    });
    await FilmsAllRequest();

    document.querySelector("main").innerHTML = template({
      filmData,
      topFourFilms,
      filmsGenres,
      subscriptionFilms,
    });
    renderSlider();

    const genreCards = document.querySelectorAll("[data-genre-uuid]");
    genreCards.forEach((genreCard) => {
      genreCard.addEventListener("click", () => {
        Router.goToGenrePage(
          genreCard.dataset.genreUuid,
          genreCard.dataset.genreNameRu,
        );
      });
    });

    const filmCards = document.querySelectorAll("[data-film-id]");
    filmCards.forEach((filmCard) => {
      filmCard.addEventListener("click", () => {
        Router.goToFilmPage(
          filmCard.dataset.filmId,
          filmCard.dataset.filmTitle,
        );
      });
    });

    addSliderHandler();
  } catch (error) {
    console.error("Error rendering films:", error);
  }
}
