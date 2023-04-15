const lineEndings = ".:;?".split("");
export function capitalise(text) {
    text = (text || "").trim();
    if (text.length > 0) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    else {
        return text;
    }
}
export function fullStop(text) {
    text = (text || "").trim();
    if (text.length > 0 &&
        lineEndings.indexOf(text.charAt(text.length - 1)) === -1) {
        return text + ".";
    }
    else {
        return text;
    }
}
export function sentence(text) {
    return capitalise(fullStop(text));
}
//# sourceMappingURL=Grammar.js.map