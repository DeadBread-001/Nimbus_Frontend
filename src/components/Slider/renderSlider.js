/**
 * Реализует функциональность слайдера на странице.
 * При клике на кнопки "Next" или "Previous" переключает активный слайд.
 */
export function renderSlider() {
  const buttons = document.querySelectorAll("[data-carousel-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");
      const activeSlide = slides.querySelector("[data-active]");

      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) {
        newIndex = slides.children.length - 1;
      }
      if (newIndex >= slides.children.length) {
        newIndex = 0;
      }

      setActiveSlide(slides, newIndex);
    });
  });

  /**
   * Устанавливает указанный слайд как активный.
   * @param {Element} slides Контейнер слайдов.
   * @param {number} newIndex Индекс нового активного слайда.
   */
  function setActiveSlide(slides, newIndex) {
    const activeSlide = slides.querySelector("[data-active]");
    if (activeSlide) {
      delete activeSlide.dataset.active;
    }
    slides.children[newIndex].dataset.active = true;
  }
}
