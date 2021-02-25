import { init as dragSystemInit, makeDraggable } from "./app/drag.js";
import { init as initCard } from "./app/card.js";

var zoomLevel = 0;

function init() {
  dragSystemInit(document);
  document.querySelectorAll(".card").forEach(initCard);
  makeDraggable(document.querySelector(".main-view"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "z") zoom(1);
    if (event.key === "x") zoom(-1);
  });
  document.getElementById("zoomIn").addEventListener("click", () => zoom(1));
  document.getElementById("zoomOut").addEventListener("click", () => zoom(-1));
}

function zoom(amount) {
  zoomLevel += amount * 0.25;
  const zoom = Math.pow(2, zoomLevel);
  document.querySelector(".main-view").style.setProperty("--zoom", zoom);
}

init();
