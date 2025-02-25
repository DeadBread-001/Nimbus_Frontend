import commentTemplate from "./commentElement.hbs";

/**
 * возарвщает html код формы
 * @param {object} comment
 * @return {html}
 */
export function renderCommentElement(comment) {
  return commentTemplate(comment);
}
