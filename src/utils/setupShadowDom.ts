//Helper function to setup a shadow dom to render a component into
//This is to avoid stylesheet collisions between the main document and the component
//This component copies the styles from the main document to the shadow dom
//when the <style> element id is 'custom-component-styles' (<style> elements inserted by the dist version of this repo)
//Or when the <style> element has 'data-vite-dev-id' attribute (<style> elements inserted by the dev version of this repo when running npm run dev)

export function setupShadowDOM(targetElement : HTMLElement) {

  console.log('setupshadowdom')

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
    //When the style was created by vite (in dev mode or dist mode) or by Ant cssinjs (used by antd design components in Plasmic)
    moveStylesToShadowDom(shadowRoot);

    //When the document is ready, do again
    //Since ant cssinjs injected styles aren't ready when we first run this
    document.addEventListener('DOMContentLoaded', function () {
      console.log('doc ready');
      moveStylesToShadowDom(shadowRoot);
    });

  }
  return shadowContainer; // Return the shadow container as the new render target
}

export function moveStylesToShadowDom(shadowRoot: ShadowRoot) {
  console.log('copyStylesToShadowDom');
  // Copy all relevant styles from the main document to the shadow dom
  // Since the shadow dom is isolated from the main document, we need to copy over the styles
  const allStyleElements = document.querySelectorAll('head style');
  const styleElementsToClone = Array.from(allStyleElements)
    .filter(el => isViteDevModeTag(el) || isStyleTagCreatedByViteCssInjectedByJsPlugin(el) || isStyleTagCreatedByAntCssinjs(el));

  styleElementsToClone.forEach(originalStyleElement => {
    const clonedStyleElement = originalStyleElement.cloneNode(true);
    shadowRoot.prepend(clonedStyleElement);
    // Remove from the main document now that it's copied to the shadow dom
    originalStyleElement.parentNode?.removeChild(originalStyleElement);
  });
}

function isViteDevModeTag(styleElement: Element) {
  //When using Vite in dev mode it sometimes inserts style tags with a 'data-vite-dev-id' attribute
  //We can check for this attribute to determine if the style tag was created by Vite in dev mode
  return styleElement.getAttribute('data-vite-dev-id') !== null;
}

function isStyleTagCreatedByViteCssInjectedByJsPlugin(styleElement: Element) {
  //We configure vite to inject all imported .css and .module.css files as a <style> tag with id 'custom-component-styles'
  //So we can check for this id to determine if the <style> tag was created by us (via Vite)
  return styleElement.id === 'custom-component-styles' || styleElement.getAttribute('data-vite-dev-id');
}

function isStyleTagCreatedByAntCssinjs(styleElement: Element) {

  console.log('isStyleTagCreatedByAntCssinjs')
  //Plasmic seems to allow Ant to create <style> tags in the dom using cssinjs https://github.com/ant-design/cssinjs/tree/57dbfefc94baecba1708ad3fef83756938acc6a2
  //These <style> tags have some predictable attributes, some of which have predictable values
  //We therefore check for these attributes to determine if the <style> tag was created by Ant cssinjs
  //So we can copy them over

  const isAntCssinjsTag = (
    styleElement.attributes.getNamedItem('data-rc-order')?.value === 'prependQueue' &&
    styleElement.attributes.getNamedItem('data-css-hash') !== null &&
    styleElement.attributes.getNamedItem('data-token-hash') !== null
  )

  console.log(isAntCssinjsTag)

  console.log(styleElement.attributes.getNamedItem('data-rc-order')?.value === 'prependQueue',
  styleElement.attributes.getNamedItem('data-css-hash') !== null,
  styleElement.attributes.getNamedItem('data-token-hash') !== null)

  return isAntCssinjsTag;
}
