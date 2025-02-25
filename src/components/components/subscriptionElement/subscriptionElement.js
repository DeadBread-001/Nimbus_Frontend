import template from "./subscriptionElement.hbs";

/**
 * Генерирует выпадающий список с выбором из предоставленных вариантов.
 * @param {Array.<string>} choices - Массив строк с вариантами выбора.
 * @return {HTMLElement} - Созданный выпадающий список.
 */
export function dropdownElement(choices) {
  return template({ choices: choices });
}
