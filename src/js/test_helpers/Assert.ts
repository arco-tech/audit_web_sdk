export function elementDeepContainsText(
  t: any,
  element: Element,
  text: string,
): void {
  const errorMessage = "Element did not deeply contain: " + text;
  return t.notThrows(() => {
    if (!findElementForText(element, text)) throw new Error(errorMessage);
  }, errorMessage);
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
