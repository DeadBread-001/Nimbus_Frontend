import templateDropdown from "./dropdownElement.hbs";

/**
 * Генерирует выпадающий список с выбором из предоставленных вариантов.
 * @param {Array.<string>} choices - Массив строк с вариантами выбора.
 * @return {HTMLElement} - Созданный выпадающий список.
 */
export function dropdownElement(choices) {
  return templateDropdown({ choices: choices });
}
