
//dom.window.scrollTo = () => {};

var jsdom = require("jsdom")
var dom = new jsdom.JSDOM("", {
    // So we can get `requestAnimationFrame`
    pretendToBeVisual: true,
})

dom.window.scrollTo = () => {};

// Fill in the globals Mithril.js needs to operate. Also, the first two are often
// useful to have just in tests.
global.window = dom.window
global.document = dom.window.document
global.requestAnimationFrame = dom.window.requestAnimationFrame