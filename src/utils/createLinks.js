export const createLink = ({ href, text, key, classNames }) => {
  const menuItem = document.createElement("a");
  menuItem.href = href;
  menuItem.textContent = text;
  menuItem.dataset.section = key;
  if (classNames) {
    if (Array.isArray(classNames)) {
      menuItem.classList.add(...classNames);
    } else {
      menuItem.classList.add(classNames);
    }
  }

  return menuItem;
};
