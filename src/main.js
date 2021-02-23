import { init as dragSystemInit, makeDraggable } from "./app/drag.js";
import { init as initCard } from "./app/card.js";

var zoomLevel = 0;

function init() {
  dragSystemInit(document);
  document.querySelectorAll(".card").forEach(initCard);
  makeDraggable(document.querySelector(".main-view"));
  // document.addEventListener("keydown", (event) => {
  //   console.log("event: ", event);
  //   if (event.key === "z") {
  //     zoom(1);
  //   } else if (event.key === "x") {
  //     zoom(-1);
  //   }
  // });
}

function zoom(amount) {
  zoomLevel += amount;
}

init();
