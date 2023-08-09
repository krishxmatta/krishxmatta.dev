window.onload = function() {
    const firstParagraph = document.querySelector('p:first-of-type');
    if (firstParagraph) {
	const nodes = firstParagraph.childNodes;
	const firstVisibleNode = Array.from(nodes).find(node => node.textContent.trim() != "");
	if(firstVisibleNode) {
            const text = firstVisibleNode.textContent;
	    const firstLetter = text.slice(0, 1);
	    const restOfText = text.slice(1);

	    const dropCapSpan = document.createElement('span');
	    dropCapSpan.className = 'drop-cap';
	    dropCapSpan.textContent = firstLetter;

	    firstParagraph.insertBefore(dropCapSpan, firstVisibleNode);

	    firstVisibleNode.textContent = restOfText;
	}
    }
};
