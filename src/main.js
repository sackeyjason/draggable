import { init as dragSystemInit, makeDraggable } from "/src/app/drag.js";
import { init as initCard } from "/src/app/card.js";

function init() {
  dragSystemInit(document);
  document.querySelectorAll(".card").forEach(initCard);
  makeDraggable(document.querySelector(".main-view"));
}

init();
