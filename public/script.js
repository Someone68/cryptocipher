let notes = ``;
let browsertimestamp = 0;

s(".newwindow").listen("click", () => {
  if (
    s(".menu").style.visibility === "hidden" ||
    !s(".menu").style.visibility
  ) {
    s(".menu").css({
      visibility: "visible",
      opacity: "1",
    });
  } else {
    s(".menu").css({
      visibility: "hidden",
      opacity: "0",
    });
  }
});

document.documentElement.listen("click", (event) => {
  if (event.target.id !== "new") {
    s(".menu").css({
      visibility: "hidden",
      opacity: "0",
    });
  }
});

let focusedWindow = null;

s("#help").listen("click", () => {
  createWindow({
    title: "CryptOS 1.0 Alpha",
    contents: `<h1>Welcome to CryptOS</h1>
	<p>v1.0 ALPHA</p>
  <br>
  <p style='opacity: 0.01'>01110111 01101000 01111001 00100000 01100001 01110010 01100101 00100000 01111001 01101111 01110101 00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01101001 01101110 01100111 00100000 01110100 01101000 01101001 01110011 </p>`,
    width: "400px",
    height: "300px",
  });
});

s("#text").listen("click", () => {
  let window = createWindow({
    title: "Notepad",
    contents:
      "<textarea id='textedit' oninput='notes = this.value' style='width: 99%; height: 99%; resize: none; background:transparent;color:white; outline: none; border: none;'>" +
      notes +
      "</textarea>",
    width: "500px",
    height: "400px",
  });

  s("#textedit").focus();
  s("#textedit").setSelectionRange(notes.length, notes.length);
});

let currentWindowID = 0;
function createWindow(options) {
  if (options) {
    if (options.title && options.contents) {
      let fwindow = makeElement(
        "div",
        `
      <div class="top" id="topbar${currentWindowID}">
			<div class="title">${options.title}</div>
			<div class="close">&times;</div>
			</div>
			<div class="resize-handle resize-handle-right"></div>
			<div class="resize-handle resize-handle-left"></div>
			<div class="resize-handle resize-handle-top"></div>
<div class="resize-handle resize-handle-bottom"></div>
<div class="resize-handle resize-handle-bottom-right"></div>
			<div class="content">${options.contents}</div>`,
        document.body,
        [],
        ["window"]
      );
      fwindow.id = currentWindowID;
      let windowid = fwindow.id;
      if (options.width) {
        fwindow.style.width = options.width;
      }
      if (options.height) {
        fwindow.style.height = options.height;
      }
      qsall(".close", (element) => {
        element.addEventListener("click", () => {
          element.parentNode.parentNode.remove();
        });
      });
      let isDragging = false;
      let initialX = 0;
      let initialY = 0;
      const windowWidth = fwindow.offsetWidth;
      const windowHeight = fwindow.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      console.log(windowid);
      s(`#topbar${windowid}`).addEventListener("mousedown", (event) => {
        initialX = event.clientX;
        initialY = event.clientY;
        isDragging = true;
      });
      fwindow.addEventListener("mousedown", (event) => {
        qsall(".window", (window) => {
          window.style.zIndex = window.id;
          focusedWindow = null;
        });
        focusedWindow = fwindow.id;
        fwindow.style.zIndex = currentWindowID + 1;
      });
      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const offsetX = e.clientX - initialX;
        const offsetY = e.clientY - initialY;
        let newX = fwindow.offsetLeft + offsetX;
        let newY = fwindow.offsetTop + offsetY;
        newX = Math.max(0, Math.min(newX, screenWidth - windowWidth));
        newY = Math.max(0, Math.min(newY, screenHeight - windowHeight));

        fwindow.style.left = `${newX}px`;
        fwindow.style.top = `${newY}px`;

        initialX = e.clientX;
        initialY = e.clientY;
      });
      document.addEventListener("mouseup", () => {
        isDragging = false;
      });

      let isResizing = false;
      const resizeHandles = document.querySelectorAll(".resize-handle");
      let resizeHandle;
      let initialWidth;
      let initialHeight;
      let initialLeft;
      let initialTop;
      function handleMouseDown(e, handle) {
        isResizing = true;
        resizeHandle = handle;
        initialWidth = fwindow.offsetWidth;
        initialHeight = fwindow.offsetHeight;
        initialLeft = fwindow.offsetLeft;
        initialTop = fwindow.offsetTop;
      }

      function handleMouseMove(e) {
        if (!isResizing) return;

        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        let newWidth = initialWidth;
        let newHeight = initialHeight;
        let newLeft = initialLeft;
        let newTop = initialTop;

        if (resizeHandle.classList.contains("resize-handle-right")) {
          newWidth = Math.max(100, initialWidth + deltaX);
        }

        if (resizeHandle.classList.contains("resize-handle-left")) {
          newWidth = Math.max(100, initialWidth - deltaX);
          newLeft = initialLeft + deltaX;
        }

        if (resizeHandle.classList.contains("resize-handle-bottom")) {
          newHeight = Math.max(100, initialHeight + deltaY);
        }

        if (resizeHandle.classList.contains("resize-handle-top")) {
          newHeight = Math.max(100, initialHeight - deltaY);
          newTop = initialTop + deltaY;
        }

        if (resizeHandle.classList.contains("resize-handle-bottom-right")) {
          newWidth = Math.max(100, initialWidth + deltaX);
          newHeight = Math.max(100, initialHeight + deltaY);
        }

        fwindow.style.width = `${newWidth}px`;
        fwindow.style.height = `${newHeight}px`;
        fwindow.style.left = `${newLeft}px`;
        fwindow.style.top = `${newTop}px`;
      }

      function handleMouseUp() {
        isResizing = false;
        resizeHandle = null;
      }

      resizeHandles.forEach((resizeHandle) => {
        resizeHandle.addEventListener("mousedown", (e) => {
          initialX = e.clientX;
          initialY = e.clientY;
          handleMouseDown(e, resizeHandle);
        });
      });

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      currentWindowID++;
      return fwindow;
    } else {
      throw new TypeError("Insufficient options were provided!");
    }
  } else {
    throw new TypeError("No options were provided when creating the window.");
  }
}
