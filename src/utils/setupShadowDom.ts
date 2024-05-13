export function setupShadowDOM(targetElement : HTMLElement) {
  let shadowRoot = targetElement.shadowRoot;

  if (!shadowRoot) {
    shadowRoot = targetElement.attachShadow({ mode: 'open' });
  }
  
  // Use a specific container within the shadow DOM for React rendering
  let shadowContainer = shadowRoot.querySelector('#shadow-container');
  
  if (!shadowContainer) {
    shadowContainer = document.createElement('div');
    shadowContainer.id = 'shadow-container';
    shadowRoot.appendChild(shadowContainer);

    //Apply styling from the main document to the shadow DOM
    //When the style element id is 'custom-component-styles' or has a 'data-vite-dev-id' attribute
    const allStyleElements = document.querySelectorAll('head style');
    const styleClones = Array.from(allStyleElements)
      .filter(el => el.getAttribute('data-vite-dev-id') || el.id === 'custom-component-styles')
      .map(el => el.cloneNode(true));
    styleClones.forEach(styleClone => shadowRoot.appendChild(styleClone));

  }
  return shadowContainer; // Return the shadow container as the new render target
}