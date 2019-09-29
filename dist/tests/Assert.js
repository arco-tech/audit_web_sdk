"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function elementDeepContainsText(t, element, text) {
    if (!findElementForText(element, text)) {
        t.fail("Element did not deeply contain: " + text);
    }
    else {
        t.pass("Element contains text");
    }
}
exports.elementDeepContainsText = elementDeepContainsText;
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