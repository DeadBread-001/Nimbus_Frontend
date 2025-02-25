import templatePagesList from "./pagesList.hbs";

/**
 * Генерирует список страниц с учетом текущей страницы и максимальной страницы.
 * @param {number} currentPage - Текущая страница.
 * @param {number} maxPage - Максимальное количество страниц.
 * @return {HTMLElement} - Созданный список страниц.
 */
export function pagesListElement(currentPage, maxPage) {
  if (maxPage < 5) {
    const arrayOfPages = Array.from(
      { length: maxPage },
      (_, index) => index + 1,
    );
    return templatePagesList({ pages: arrayOfPages });
  }
  return templatePagesList({ pages: [1, 2, 3, 4, 5] });
}
