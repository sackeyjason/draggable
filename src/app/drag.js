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
    startHolding(event, node, system);
  });
}

function startHolding(event, node) {
  if (system.holding) return;
  raiseToTop(node);
  system.node = node;
  system.holding = true;
  system.x = event.clientX;
  system.y = event.clientY;
  system.ox = +node.style.getPropertyValue("--x") || 0;
  system.oy = +node.style.getPropertyValue("--y") || 0;
}

function init(document) {
  document.addEventListener("mouseup", () => {
    system.node = null;
    system.holding = false;
  });
  document.addEventListener("mousemove", handleMove);
}

function handleMove(event) {
  if (system.holding) {
    const dx = event.clientX - system.x;
    const dy = event.clientY - system.y;
    system.node.style.setProperty("--x", dx + system.ox);
    system.node.style.setProperty("--y", dy + system.oy);
  }
}

export { init, makeDraggable };
