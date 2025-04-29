const links = {
  g: {
    href: "https://google.com",
    alias: "google",
  },
};

const initShortcuts = () => {
  window.addEventListener("keypress", async (e) => {
    const link = links[e.key];
    if (link) {
      window.location.href = link.href;
    }
  });
};

const initTime = () => {
  const clock = document.getElementById("clock");

  const setTime = () => {
    const d = new Date();
    const s = `0${d.getSeconds()}`;
    const m = `0${d.getMinutes()}`;
    const h = `0${d.getHours()}`;
    clock.textContent = `${h.substring(h.length - 2)}:${m.substring(m.length - 2)}:${s.substring(s.length - 2)}`;
  };

  setTime();
  setInterval(setTime, 1000);
};

const initProgress = () => {
  const clamp = (lower, number, upper) => {
    number = number < lower ? lower : number;
    number = number > upper ? upper : number;
    return number;
  };

  const progressBarFill = document.getElementById("progress-bar-fill");
  const progress = document.getElementById("progress");
  const fullTime = 8 * 60 * 60 * 1000;
  const currentDate = new Date();
  const startTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    9,
  ).getTime();

  const id = setInterval(setProgress, 100);

  function setProgress() {
    const currentTime = new Date().getTime();
    const width = clamp(
      0,
      Math.floor(((currentTime - startTime) / fullTime) * 10000) / 100,
      100,
    ).toFixed(2);
    progressBarFill.style.width = width + "%";
    progress.textContent = width + "%";

    if (width >= 100) {
      clearInterval(id);
    }
  }
};

const initList = () => {
  const list_element = document.getElementById("list");
  for (const [key, value] of Object.entries(links)) {
    const list_item = document.createElement("li");
    const list_link = document.createElement("a");

    list_link.innerText = `[${key}] ${value.alias}`;
    list_link.href = value.href;

    list_item.appendChild(list_link);
    list_element.appendChild(list_item);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initShortcuts();
  initTime();
  initProgress();
  initList();
});
