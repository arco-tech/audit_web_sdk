export function simulateMouseClick(element: Element): void {
  element.dispatchEvent(new window.MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
  }));
}

export function simulateInput(element: HTMLInputElement, value: any): void {
  const event = new window.Event("input", {bubbles: true});
  element.value = value;
  element.dispatchEvent(event);
}
