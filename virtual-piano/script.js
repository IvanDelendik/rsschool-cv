const NOTES = document.getElementById("notes");
const LETTERS = document.getElementById("letters");
const WHITE = document.querySelectorAll(".piano-key-white");
const BLACK = document.querySelectorAll(".piano-key-black");
const FULLSCREEN = document.querySelector(".fullscreen");

LETTERS.addEventListener("click", () => {
  LETTERS.classList.add("btn-active");
  NOTES.classList.remove("btn-active");

  WHITE.forEach((element) => {
    if (element.classList.contains("piano-key-white-letters")) {
      return;
    }
    element.classList.add("piano-key-white-letters");
    element.classList.remove("piano-key-white-notes");
  });

  BLACK.forEach((element) => {
    if (element.classList.contains("piano-key-black-letters")) {
      return;
    }
    element.classList.add("piano-key-black-letters");
    element.classList.remove("piano-key-black-notes");
  });
});

NOTES.addEventListener("click", () => {
  NOTES.classList.add("btn-active");
  LETTERS.classList.remove("btn-active");

  WHITE.forEach((element) => {
    if (element.classList.contains("piano-key-white-notes")) {
      return;
    }
    element.classList.add("piano-key-white-notes");
    element.classList.remove("piano-key-white-letters");
  });

  BLACK.forEach((element) => {
    if (element.classList.contains("piano-key-black-notes")) {
      return;
    }
    element.classList.add("piano-key-black-notes");
    element.classList.remove("piano-key-black-letters");
  });
});

FULLSCREEN.addEventListener("click", () => {
  realisationFullScreen();
});

function realisationFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const piano = document.querySelector(".piano");
const collection = document.querySelectorAll(".piano-key");

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const startSound = (event) => {
  event.target.classList.add("active");
  event.target.classList.add("piano-key-active-pseudo");
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
};

const stopSound = (event) => {
  event.target.classList.remove("active");
  event.target.classList.remove("piano-key-active-pseudo");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("active");
    event.target.classList.add("piano-key-active-pseudo");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }

  collection.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};

const stopCorrespondOver = () => {
  collection.forEach((elem) => {
    elem.classList.remove("active");
    elem.classList.remove("piano-key-active-pseudo");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

piano.addEventListener("mousedown", startCorrespondOver);
piano.addEventListener("mouseup", stopCorrespondOver);

const startKeyBoard = (event) => {
  if (event.repeat === true) return;
  let buttonKey = document.querySelector(
    `.piano-key[data-play="${event.code}"]`
  );

  if (!!buttonKey) {
    buttonKey.classList.add("active");
    buttonKey.classList.add("piano-key-active-pseudo");
    const note = buttonKey.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
};

const stopKeyBoard = (event) => {
  let buttonKey = document.querySelector(
    `.piano-key[data-play="${event.code}"]`
  );

  if (!!buttonKey) {
    buttonKey.classList.remove("active");
    buttonKey.classList.remove("piano-key-active-pseudo");
  }
};

window.addEventListener("keydown", startKeyBoard);
window.addEventListener("keyup", stopKeyBoard);
