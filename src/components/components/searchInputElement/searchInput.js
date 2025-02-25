import templateSearchInput from "./searchInput.hbs";

/**
 * Генерирует HTML код для поля поиска с указанным placeholder.
 * @param {string} name - Имя для placeholder поля поиска.
 * @return {string} - HTML код для поля поиска.
 */
export function searchInput(name) {
  return templateSearchInput({ name: name });
}
