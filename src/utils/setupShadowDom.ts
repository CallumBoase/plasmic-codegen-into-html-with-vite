//Helper function to setup a shadow dom to render a component into
//This is to avoid stylesheet collisions between the main document and the component
//This component copies the styles from the main document to the shadow dom
//when the <style> element id is 'custom-component-styles' (<style> elements inserted by the dist version of this repo)
//Or when the <style> element has 'data-vite-dev-id' attribute (<style> elements inserted by the dev version of this repo when running npm run dev)

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

    //Apply styling from the main document to the shadow DOM when appropriate
    //When the style element id is 'custom-component-styles' or has a 'data-vite-dev-id' attribute
    const allStyleElements = document.querySelectorAll('head style');
    const styleClones = Array.from(allStyleElements)
      .filter(el => el.getAttribute('data-vite-dev-id') || el.id === 'custom-component-styles')
      .map(el => el.cloneNode(true));
    styleClones.forEach(styleClone => shadowRoot.appendChild(styleClone));

  }
  return shadowContainer; // Return the shadow container as the new render target
}