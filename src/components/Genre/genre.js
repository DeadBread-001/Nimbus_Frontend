import template from "./genre.hbs";
import Router from "../../utils/router.js";
import { getFilmsOfGenre } from "../../api/films.js";

/**
 * Отображает страницу фильмов определенного жанра.
 * @param {string} genreUuid Идентификатор жанра.
 * @param {string} genreNameRu Название жанра.
 */
export async function renderGenrePage(genreUuid, genreNameRu) {
  const filmsData = await getFilmsOfGenre(genreUuid);

  const genrePageData = { filmsData, genreNameRu };
  document.querySelector("main").innerHTML = template(genrePageData);

  const filmCards = document.querySelectorAll("[data-film-id]");

  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
    });
  });
}
