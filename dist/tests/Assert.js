export function elementDeepContainsText(t, element, text) {
    if (findElementForText(element, text)) {
        t.pass("Element contains text");
    }
    else {
        t.fail("Element did not deeply contain: " + text);
    }
}
export function elementNotDeepContainsText(t, element, text) {
    if (!findElementForText(element, text)) {
        t.pass("Element doesn't contain text");
    }
    else {
        t.fail("Element deeply contained text: " + text);
    }
}
export function findElementForText(element, text) {
    if (typeof element.textContent === "string" &&
        element.textContent.indexOf(text) != -1) {
        return true;
    }
    else if (element.children && element.children.length > 0) {
        for (let c = 0; c < element.children.length; c++) {
            if (findElementForText(element.children.item(c), text)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=Assert.js.map