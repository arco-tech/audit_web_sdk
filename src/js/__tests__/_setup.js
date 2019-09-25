require("browser-env")(["window"], {
  url: "http://localhost:8080",
});

global.requestAnimationFrame = (callback) => callback();
