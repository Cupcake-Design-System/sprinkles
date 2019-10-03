export function getElementPageY(element: HTMLElement): number | null {
  const clientRect = element.getBoundingClientRect && element.getBoundingClientRect();
  const documentElementScrollTop = (document.documentElement && document.documentElement.scrollTop) || 0;
  const documentBodyScrollTop = (document.body && document.body.scrollTop) || 0;

  if (clientRect == null) {
    return null;
  }

  return clientRect.top + documentElementScrollTop + documentBodyScrollTop;
}
