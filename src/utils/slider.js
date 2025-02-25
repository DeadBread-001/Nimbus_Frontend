export const addSliderHandler = () => {
  const arrowBtns = document.querySelectorAll("[class*=container] button");

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filmsContainer = btn.closest("[class*=container]");
      const carousel = filmsContainer.querySelector("ul[class*=carousel]");

      const firstCardWidth =
        carousel.querySelector("div[class*=card]").offsetWidth;
      const moveDirection = btn.id === "left" ? -1 : 1;

      carousel.scrollLeft += firstCardWidth * moveDirection;
    });
  });
};
