function stuElementCopyId() {
	const copyIcon = '<svg version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="bricks-svg"><path d="M9.5,5h11c0.276,0 0.5,-0.224 0.5,-0.5v-1c0,-1.378 -1.122,-2.5 -2.5,-2.5h-1.774c-0.353,-0.609 -1.007,-1 -1.726,-1c-0.718,0 -1.373,0.39 -1.726,1h-1.774c-1.378,0 -2.5,1.122 -2.5,2.5v1c0,0.276 0.224,0.5 0.5,0.5Zm14.766,-2h-1.766c-0.276,0 -0.5,0.224 -0.5,0.5v1c0,0.828 -0.672,1.5 -1.5,1.5h-11c-0.826,0 -1.5,-0.672 -1.5,-1.5v-1c0,-0.276 -0.224,-0.5 -0.5,-0.5h-1.765c-0.956,0 -1.735,0.781 -1.735,1.739v23.523c0,0.957 0.779,1.738 1.735,1.738h18.529c0.957,0 1.736,-0.781 1.736,-1.739v-23.522c0,-0.958 -0.778,-1.739 -1.734,-1.739Z" fill="currentColor"></path></svg>';

	const span = document.createElement('span');
	span.setAttribute('class', 'bricks-svg-wrapper stu-copy');
	span.setAttribute('data-balloon', 'Copy (Element ID)');
	span.setAttribute('data-balloon-pos', 'top-right');
	span.innerHTML = copyIcon;

	const style = document.createElement('style');
	style.innerHTML = `
		#bricks-panel-element-classes .active-class .actions .stu-copy {
			visibility: hidden;
		}
		#bricks-panel-element-classes .active-class:hover .actions .stu-copy {
			visibility: visible;
		}
	`;
	document.head.appendChild(style);

	const targetNode = document.getElementById('bricks-panel'),
		  config = {childList: true, subtree: true},
		  callback = (mutationList, observer) => {
			  for (const mutation of mutationList) {

				      // If changing element being edited
				  if (mutation.target.id == 'bricks-panel-element' ||
					  // If going from settings panel or element picker to editing element
					  mutation.addedNodes.length !== 0 && mutation.addedNodes[0].id === 'bricks-panel-element') {

					  const activeClass = document.querySelector('#bricks-panel-element-classes .active-class'),
							placeholder = activeClass.querySelector('input').getAttribute('placeholder'),
							bricksCanvas = document.getElementById('bricks-builder-iframe').contentWindow.document,
							dataId = bricksCanvas.querySelector(placeholder) ? bricksCanvas.querySelector(placeholder).getAttribute('data-id') : null,
							actionsContainer = activeClass.querySelector('div.actions');

					  actionsContainer.prepend(span);

					  const copy = actionsContainer.querySelector('span.stu-copy');

					  copy.addEventListener('click', function(e) {
						  e.stopPropagation();
						  navigator.clipboard.writeText(placeholder);
						  // navigator.clipboard.writeText(dataId);
					  });

				  }
			  }
		  };

	const observer = new MutationObserver(callback);

	observer.observe(targetNode, config);
}

document.addEventListener('DOMContentLoaded', function() {
	stuElementCopyId();
});
