import { getElementPageY } from './get-element-page-y';

export function scrollToView(element: HTMLElement) {
  const scrollParent = findScrollParent(element);

  if (scrollParent == null) {
    return;
  }

  const elementTopY = getElementPageY(element);
  const parentTopY = getElementPageY(scrollParent);

  if (elementTopY == null || parentTopY == null) {
    return;
  }

  const elementBottomY = elementTopY + element.offsetHeight;
  const parentBottomY = parentTopY + scrollParent.offsetHeight;

  if (isBetween(elementTopY, parentTopY, parentBottomY) && isBetween(elementBottomY, parentTopY, parentBottomY)) {
    return;
  }

  scrollParent.scrollTop += elementBottomY - parentBottomY;
}


function findScrollParent(node: Node): HTMLElement | null {
  if (!(node instanceof HTMLElement)) {
    return node.parentNode && findScrollParent(node.parentNode);
  }

  const overflowY = window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY != null && overflowY !== 'visible' && overflowY !== 'hidden';

  if (isScrollable && node.scrollHeight > node.clientHeight) {
    return node;
  }

  return node.parentNode && findScrollParent(node.parentNode);
}

function isBetween(position: number, top: number, bottom: number) {
  if (top > bottom) {
    [top, bottom] = [bottom, top];
  }

  return position > top && position < bottom;
}
