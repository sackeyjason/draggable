const system = {
  node: null,
  holding: false,
};

function init() {
  document.querySelectorAll(".draggable").forEach(makeDraggable);
  document.addEventListener("mouseup", () => {
    system.node = null;
    system.holding = false;
  });
  document.addEventListener("mousemove", handleMove);
}

function makeDraggable(node) {
  node.addEventListener("mousedown", (event) => {
    startHolding(event, node);
  });
}

function startHolding(event, node) {
  if (system.holding) return;
  system.node = node;
  system.holding = true;
  system.x = event.clientX;
  system.y = event.clientY;
  system.ox = +node.style.getPropertyValue("--x") || 0;
  system.oy = +node.style.getPropertyValue("--y") || 0;
}

function handleMove(event) {
  if (system.holding) {
    const x = event.clientX - system.x + system.ox;
    const y = event.clientY - system.y + system.oy;
    system.node.style.setProperty("--x", x);
    system.node.style.setProperty("--y", y);
  }
}

init();
