export function isFocusWithin(element: HTMLElement): boolean {
  if (document.activeElement == null) {
    return false;
  }

  if (document.activeElement === element) {
    return true;
  }

  return element.contains(document.activeElement);
}
