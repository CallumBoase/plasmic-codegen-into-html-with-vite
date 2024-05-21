//Helper function to determine the target element for rendering a component
//Either a div with the given id or a shadow root within the div with the given id

import { setupShadowDOM } from './setupShadowDom'

export function getRenderTarget(targetDivId: string, useShadowDom: boolean) {
  const targetElement = document.getElementById(targetDivId);
  if (!targetElement) throw new Error(`Element with id ${targetDivId} not found`);

  return useShadowDom ? setupShadowDOM(targetElement) : targetElement;
}