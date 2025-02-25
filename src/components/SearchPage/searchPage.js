import searchPageTemplate from "./searchPage.hbs";
import { dropdownElement } from "../components/dropdownElement/dropdownElement.js";
import { searchInput } from "../components/searchInputElement/searchInput.js";
import { renderSearchResult } from "../components/searchResult/searchResult";

const SEARCH_TYPE_OPTION = ["Фильмы", "Сериалы", "Актеры"];
const SEARCH_TYPE_OPTION_VALUE = ["films", "serials", "actors"];
// const SEARCH_SORTING_OPTION = [
//   "По популярности(убыв.)",
//   "По популярности(возр.)",
//   "По дате(убыв.)",
//   "По дате(убыв.)",
//   "По алфавиту(возр.)",
//   "По алфавиту(возр.)",
// ];
/**
 * Отображает страницу фильмов определенного жанра.
 * @param {string} genreUuid Идентификатор жанра.
 * @param {string} genreNameRu Название жанра.
 */
export async function renderSearchPage() {
  document.querySelector("main").innerHTML = searchPageTemplate();
  const searchInputBlock = document.querySelector(".search-input-block");
  const searchResultBlock = document.querySelector(".search-result-block");
  const searchInputElement = searchInput("Поиск");
  searchInputBlock.insertAdjacentHTML("afterbegin", searchInputElement);

  // TODO сортировка, ждет реализации на беке
  // const sortbyBlock = document.querySelector(
  //   ".search-input-block__sortby-element",
  // );
  // const sortbyElement = dropdownElement(SEARCH_SORTING_OPTION);
  // sortbyBlock.insertAdjacentHTML("beforeend", sortbyElement);

  const findbyBlock = document.querySelector(
    ".search-input-block__findby-element",
  );
  const findbyElement = dropdownElement(SEARCH_TYPE_OPTION);
  findbyBlock.insertAdjacentHTML("beforeend", findbyElement);

  const dropdownElements = document.querySelectorAll(".dropdown-element");
  const searchButton = document.querySelector(".search-button");
  const searchInputField = document.querySelector("[type=search]");

  searchButton.addEventListener("click", () => {
    const dropdownIndex = SEARCH_TYPE_OPTION.indexOf(dropdownElements[0].value);
    renderSearchResult(searchResultBlock, {
      page: 1,
      string: searchInputField.value.toLowerCase(),
      findBy: SEARCH_TYPE_OPTION_VALUE[dropdownIndex],
    });
  });

  searchInputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  dropdownElements.forEach((element) => {
    element.addEventListener("change", () => {
      const dropdownIndex = SEARCH_TYPE_OPTION.indexOf(element.value);
      renderSearchResult(searchResultBlock, {
        page: 1,
        string: searchInputField.value.toLowerCase(),
        findBy: SEARCH_TYPE_OPTION_VALUE[dropdownIndex],
      });
    });
  });

  renderSearchResult(searchResultBlock);
}
