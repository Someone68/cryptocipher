s(".newwindow").listen("click", () => {
  if (s(".menu").style.display === "none" || !s(".menu").style.display) {
    s(".menu").css({
      display: "inline-block",
    });
  } else {
    s(".menu").css({
      display: "none",
    });
  }
});

document.documentElement.listen("click", (event) => {
  if (event.target.id !== "new") {
    s(".menu").css({
      display: "none",
    });
  }
});

s("#help").listen("click", () => {});

function openwindow(options) {
  if (options) {
    if (options.title && options.contents) {
      let window = makeElement(
        "div",
        `
      <div class=""></div>`
      );
    } else {
      throw new TypeError("Insufficient options were provided!");
    }
  } else {
    throw new TypeError("No options were provided when creating the window.");
  }
}
