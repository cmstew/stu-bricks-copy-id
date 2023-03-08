document.addEventListener('DOMContentLoaded', () => {
	stuElementCopyElement();
});

function stuElementCopyElement() {
  const copyIdIcon = '<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.549a.5.5 0 0 1 .5.5v2h3v-2a.5.5 0 0 1 1 0v2H10a.5.5 0 0 1 0 1H8.5v3H10a.5.5 0 0 1 0 1H8.5v2a.5.5 0 1 1-1 0v-2h-3v2a.5.5 0 1 1-1 0v-2H2a.5.5 0 0 1 0-1h1.5v-3H2a.5.5 0 0 1 0-1h1.5v-2a.5.5 0 0 1 .5-.5Zm3.5 6.5v-3h-3v3h3Z" fill="currentColor"/></svg>';
  const copyClassIcon = '<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.146 3.695a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .707l-2.5 2.5a.5.5 0 1 1-.708-.707l2.147-2.146-2.147-2.147a.5.5 0 0 1 0-.707Zm-4.292 0a.5.5 0 0 1 0 .707L1.707 6.55l2.147 2.146a.5.5 0 1 1-.708.707l-2.5-2.5a.5.5 0 0 1 0-.707l2.5-2.5a.5.5 0 0 1 .708 0ZM7.108 1.56a.5.5 0 0 1 .38.597l-2 9a.5.5 0 0 1-.976-.217l2-9a.5.5 0 0 1 .596-.38Z" fill="currentColor"/></svg>';

  const { querySelector } = document;
  const { contentWindow } = document.getElementById('bricks-builder-iframe');

  const spanId = document.createElement('span');
  spanId.setAttribute('class', 'bricks-svg-wrapper stu-copy-id');
  spanId.setAttribute('data-balloon', 'Copy (Element ID)');
  spanId.setAttribute('data-balloon-pos', 'top-right');
  spanId.innerHTML = copyIdIcon;

  const spanClass = document.createElement('span');
  spanClass.setAttribute('class', 'bricks-svg-wrapper stu-copy-class');
  spanClass.setAttribute('data-balloon', 'Copy (Element Class)');
  spanClass.setAttribute('data-balloon-pos', 'top-right');
  spanClass.innerHTML = copyClassIcon;

  document.head.appendChild(document.createElement('style')).innerHTML = `
      #bricks-panel-element-classes .active-class .actions :is(.stu-copy-id, .stu-copy-class) {
        visibility: hidden;
      }
      #bricks-panel-element-classes .active-class:hover .actions :is(.stu-copy-id, .stu-copy-class) {
        visibility: visible;
      }
  `;

  const targetNode = document.querySelector('#bricks-panel');
  const config = { childList: true, subtree: true };

  const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.target.id === 'bricks-panel-element' || (mutation.addedNodes.length > 0 && mutation.addedNodes[0].id === 'bricks-panel-element')) {
          const activeClass = document.querySelector('#bricks-panel-element-classes .active-class');
          const placeholder = activeClass.querySelector('input').getAttribute('placeholder');
          const bricksCanvas = contentWindow.document;
          const dataId = bricksCanvas.querySelector(placeholder) ? bricksCanvas.querySelector(placeholder).getAttribute('data-id') : null;
          const actionsContainer = activeClass.querySelector('div.actions');
          const elementClassName = document.querySelector('#bricks-panel-element-classes .element-classes .element-class.active > .name')?.innerText ?? null;

          actionsContainer.prepend(spanId, spanClass);

          const copyId = actionsContainer.querySelector('span.stu-copy-id');
          copyId.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(placeholder);
          });

          const copyClass = actionsContainer.querySelector('span.stu-copy-class');
          copyClass.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(elementClass);
          });
        }
      }
    };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
