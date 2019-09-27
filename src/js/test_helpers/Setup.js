require("browser-env")(["window"], {
  url: "http://localhost:8080",
});

window.scrollTo = () => {};

global.document = window.document;

global.requestAnimationFrame = (callback) => callback();

