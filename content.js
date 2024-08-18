document.addEventListener('dblclick', function(event) {
  const selection = window.getSelection();
  const selectedText = selection.toString();

  // Check if the double-clicked target is already a highlighted span
  if (event.target.tagName === 'SPAN' && event.target.style.backgroundColor === 'yellow') {
      // Remove the highlight by replacing the span with its text content
      const parent = event.target.parentNode;
      while (event.target.firstChild) {
          parent.insertBefore(event.target.firstChild, event.target);
      }
      parent.removeChild(event.target);
      selection.removeAllRanges();
      return;
  }

  // Proceed only if there's a selection and it's not just whitespace
  if (!selectedText.trim()) {
      return;
  }

  const range = selection.getRangeAt(0);
  const startNode = range.startContainer;

  if (startNode.nodeType === 3 && (startNode.parentNode.tagName === 'P' || startNode.parentNode.tagName === 'DIV')) {
      const highlightSpan = document.createElement('span');
      highlightSpan.style.backgroundColor = 'yellow';
      highlightSpan.textContent = selectedText;

      range.deleteContents();
      range.insertNode(highlightSpan);

      if (selectedText[selectedText.length - 1] === ' ') {
          const spaceTextNode = document.createTextNode(' ');
          highlightSpan.parentNode.insertBefore(spaceTextNode, highlightSpan.nextSibling);
      }

      selection.removeAllRanges();
  }
});
