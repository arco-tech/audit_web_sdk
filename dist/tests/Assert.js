"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElementForText = exports.elementNotDeepContainsText = exports.elementDeepContainsText = void 0;
function elementDeepContainsText(t, element, text) {
    if (findElementForText(element, text)) {
        t.pass("Element contains text");
    }
    else {
        t.fail("Element did not deeply contain: " + text);
    }
}
exports.elementDeepContainsText = elementDeepContainsText;
function elementNotDeepContainsText(t, element, text) {
    if (!findElementForText(element, text)) {
        t.pass("Element doesn't contain text");
    }
    else {
        t.fail("Element deeply contained text: " + text);
    }
}
exports.elementNotDeepContainsText = elementNotDeepContainsText;
function findElementForText(element, text) {
    if (typeof element.textContent === "string" &&
        element.textContent.indexOf(text) != -1) {
        return true;
    }
    else if (element.children && element.children.length > 0) {
        for (var c = 0; c < element.children.length; c++) {
            if (findElementForText(element.children.item(c), text)) {
                return true;
            }
        }
    }
    return false;
}
exports.findElementForText = findElementForText;
//# sourceMappingURL=Assert.js.map