const system = {
  node: null,
  holding: false,
};

const raiseToTop = (() => {
  // todo: lower z-indices some time
  let index = 1;
  return (card) => {
    index++;
    card.style.setProperty("z-index", `${index}`);
  };
})();

function makeDraggable(node) {
  node.addEventListener("mousedown", (event) => {
    startHolding(event, node);
  });
  node.addEventListener("touchstart", (event) => {
    if (!["A"].includes(event.target.nodeName)) {
      event.preventDefault();
    }
    startHolding(event, node);
  });
}

function startHolding(event, node) {
  if (system.holding) return;
  raiseToTop(node);
  system.node = node;
  system.holding = true;
  let [x, y] = getClientCoords(event);
  system.x = x;
  system.y = y;
  system.ox = +node.style.getPropertyValue("--x") || 0;
  system.oy = +node.style.getPropertyValue("--y") || 0;
}

function getClientCoords(event) {
  let q = event;
  if (event.type.indexOf("touch") === 0) {
    q = event.touches[0];
  }
  return [q.clientX, q.clientY];
}

function init(document) {
  document.addEventListener("mouseup", () => {
    system.node = null;
    system.holding = false;
  });
  document.addEventListener("touchend", () => {
    system.node = null;
    system.holding = false;
  });
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove);
}

function handleMove(event) {
  if (system.holding) {
    const [clientX, clientY] = getClientCoords(event);
    const dx = clientX - system.x;
    const dy = clientY - system.y;
    system.node.style.setProperty("--x", dx + system.ox);
    system.node.style.setProperty("--y", dy + system.oy);
  }
}

export { init, makeDraggable };
