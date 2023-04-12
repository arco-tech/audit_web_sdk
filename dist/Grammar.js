"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentence = exports.fullStop = exports.capitalise = void 0;
var lineEndings = ".:;?".split("");
function capitalise(text) {
    text = (text || "").trim();
    if (text.length > 0) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    else {
        return text;
    }
}
exports.capitalise = capitalise;
function fullStop(text) {
    text = (text || "").trim();
    if (text.length > 0 &&
        lineEndings.indexOf(text.charAt(text.length - 1)) === -1) {
        return text + ".";
    }
    else {
        return text;
    }
}
exports.fullStop = fullStop;
function sentence(text) {
    return capitalise(fullStop(text));
}
exports.sentence = sentence;
//# sourceMappingURL=Grammar.js.map