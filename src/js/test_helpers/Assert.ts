export function elementDeepContainsText(
  t: any,
  element: Element,
  text: string,
): void {
  if (!findElementForText(element, text)) {
    t.fail("Element did not deeply contain: " + text);
  } else {
    t.pass("Element contains text");
  }
}

export function findElementForText(element: Element, text: string): boolean {
  if (
    typeof element.textContent === "string" &&
    element.textContent.indexOf(text) != -1
  ) {
    return true;
  } else if (element.children && element.children.length > 0) {
    for (let c = 0; c < element.children.length; c++) {
      if (findElementForText(element.children.item(c), text)) {
        return true;
      }
    }
  }
  return false;
}
