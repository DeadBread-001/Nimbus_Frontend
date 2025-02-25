import template from "./actor.hbs";
import Router from "../../utils/router.js";
import { addSliderHandler } from "../../utils/slider.js";
import * as actorsApi from "../../api/actors";
import * as filmsApi from "../../api/films";

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderActorPage(actorId) {
  const [actorData, filmsData] = await Promise.all([
    actorsApi.getActorData(actorId),
    filmsApi.getAll(),
  ]);

  const actorSection = document.createElement("section");
  actorSection.classList.add("actor-section");

  const actorPageData = { ...actorData, filmsData };

  document.querySelector("main").innerHTML = template(actorPageData);

  const filmCards = document.querySelectorAll("[data-film-id]");
  filmCards.forEach((filmCard, index) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmsData[index].title);
    });
  });

  addSliderHandler();
}
