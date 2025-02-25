import { formatTime } from "../../utils/timeConvert.js";
import template from "./Player.hbs";
import * as images from "../../img/imgConstants.js";
import Router from "../../utils/router.js";

/**
 * Отображает интерфейс проигрывателя для указанного фильма.
 * @param {string} filmId - Идентификатор фильма, который проигрывается.
 * @param {string} filmTitle - Заголовок фильма, который проигрывается.
 * @param {string} source - URL источника видео.
 * @param {Array} series - все серии
 * @param {int} index - индекс серии
 * @return {void}
 */
export async function renderPlayer(
  filmId,
  filmTitle,
  source,
  series = null,
  index = 0,
) {
  const video = { src: source };
  let mainVideo = null;
  document.querySelector("main").innerHTML = template(video);
  const exitButton = document.querySelector("#exit-player");
  const container = document.querySelector(".player-container");
  mainVideo = container.querySelector("video");
  const progressBar = container.querySelector(
    ".player-container__progress-bar",
  );
  const videoTimeline = container.querySelector(
    ".player-container__video-timeline",
  );
  const volumeBtn = container.querySelector(".player-container__volume img");
  const volumeSlider = container.querySelector(".left input");
  const currentVideoTime = container.querySelector(
    ".player-container__current-time",
  );
  const videoDuration = container.querySelector(
    ".player-container__video-duration",
  );
  const nextSeries = container.querySelector(
    ".player-container__skip-forward img",
  );
  const previousSeries = container.querySelector(
    ".player-container__skip-backward img",
  );
  const playPauseBtn = container.querySelector(
    ".player-container__play-pause img",
  );
  const speedBtn = container.querySelector(
    ".player-container__playback-speed span",
  );
  const speedOptions = container.querySelector(
    ".player-container__speed-options",
  );
  const pinInPicBtn = container.querySelector(
    ".player-container__pic-in-pic span",
  );

  const fullscreenBtn = container.querySelector(
    ".player-container__fullscreen img",
  );

  mainVideo.play();
  let timer;
  const hideControls = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      );

    if ((isMobile && !mainVideo.paused) || (!isMobile && mainVideo.paused)) {
      return;
    }

    timer = setTimeout(() => {
      container.classList.add("no-cursor");
      exitButton.classList.remove("show-exit");
      container.classList.remove("show-controls");
    }, 1000);
  };

  hideControls();

  container.addEventListener("mousemove", () => {
    container.classList.remove("no-cursor");
    exitButton.classList.add("show-exit");
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
  });

  mainVideo.addEventListener("timeupdate", (e) => {
    const { currentTime, duration } = e.target;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVideoTime.innerText = formatTime(currentTime);
  });

  mainVideo.addEventListener("loadeddata", (e) => {
    videoDuration.innerText = formatTime(e.target.duration);
  });

  videoTimeline.addEventListener("click", (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });

  videoTimeline.addEventListener("touchstart", (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
  });

  const draggableProgressBarMobile = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.touches[0].pageX - e.touches[0].target.offsetLeft}px`;
    mainVideo.currentTime =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  const draggableProgressBar = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  videoTimeline.addEventListener("mousedown", () => {
    videoTimeline.addEventListener("mousemove", draggableProgressBar);
  });

  videoTimeline.addEventListener("touchstart", () => {
    videoTimeline.addEventListener("touchmove", draggableProgressBarMobile);
  });

  container.addEventListener("mouseup", () => {
    videoTimeline.removeEventListener("mousemove", draggableProgressBar);
  });

  videoTimeline.addEventListener("touchend", () => {
    videoTimeline.addEventListener("touchmove", draggableProgressBarMobile);
  });

  videoTimeline.addEventListener("mousemove", (e) => {
    const progressTime = videoTimeline.querySelector("span");
    const offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    const timelineWidth = videoTimeline.clientWidth;
    const percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
  });

  videoTimeline.addEventListener("touchmove", (e) => {
    const progressTime = videoTimeline.querySelector("span");
    const offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
    progressTime.style.left = `${offsetX}px`;
    const timelineWidth = videoTimeline.clientWidth;
    const percent =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
    progressTime.innerText = formatTime(percent);
  });

  volumeBtn.addEventListener("click", () => {
    if (mainVideo.volume) {
      mainVideo.volume = 0;
      volumeBtn.src = images.NO_SOUND_IMG;
    } else {
      mainVideo.volume = 0.5;
      volumeBtn.src = images.SOUND_IMG;
    }
    volumeSlider.value = mainVideo.volume;
  });

  volumeSlider.addEventListener("input", (e) => {
    const volumeValue = parseFloat(e.target.value);
    mainVideo.volume = volumeValue;

    volumeBtn.src = volumeValue === 0 ? images.NO_SOUND_IMG : images.SOUND_IMG;
  });

  speedOptions.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      mainVideo.playbackRate = parseFloat(option.dataset.speed);
      speedOptions.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });

  speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show");
  });

  container.addEventListener("click", (e) => {
    if (e.target.tagName === "VIDEO") {
      mainVideo.paused ? mainVideo.play() : mainVideo.pause();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG" || e.target.className !== "speed-img") {
      speedOptions.classList.remove("show");
    }
  });

  pinInPicBtn.addEventListener("click", () => {
    mainVideo.requestPictureInPicture();
  });

  fullscreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
      fullscreenBtn.src = images.FULLSCREEN_IMG;
      return document.exitFullscreen();
    }
    fullscreenBtn.src = images.EXIT_FULLSCREEN_IMG;
    container.requestFullscreen();
  });

  previousSeries.addEventListener("click", () => {
    if (series && index !== 0) {
      index -= 1;
      renderPlayer(filmId, filmTitle, series[index].link, series, index--);
    }
  });

  nextSeries.addEventListener("click", () => {
    if (series && index !== series.length - 1) {
      index += 1;
      mainVideo.pause();
      renderPlayer(filmId, filmTitle, series[index].link, series, index);
    }
  });

  playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
  });

  mainVideo.addEventListener("play", () => {
    playPauseBtn.src = images.PAUSE_IMG;
  });

  mainVideo.addEventListener("pause", () => {
    playPauseBtn.src = images.PLAY_IMG;
  });

  exitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    Router.goToFilmPage(filmId, filmTitle);
  });
}
