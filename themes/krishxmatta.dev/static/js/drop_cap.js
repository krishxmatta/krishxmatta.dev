function adjustMargin() {
    const firstParagraph = document.querySelector('.drop-cap-paragraph');
    if (firstParagraph) {
        const dropCapSpan = firstParagraph.querySelector('.drop-cap');
        if (dropCapSpan) {
            const dropCapHeight = dropCapSpan.offsetHeight;
            const paragraphHeight = firstParagraph.offsetHeight;

            if (dropCapHeight > paragraphHeight) {
                const extraMargin = dropCapHeight - paragraphHeight;
                firstParagraph.style.marginBottom = `${extraMargin}px`;
            } else {
                firstParagraph.style.marginBottom = ''; // Reset the margin if not needed
            }
        }
    }
}

window.onload = function() {
    const firstParagraph = document.querySelector('p:not(.post-info-date):first-of-type');
    if (firstParagraph) {
        firstParagraph.classList.add('drop-cap-paragraph');
	
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

	    adjustMargin();
	}
    }
};

window.addEventListener('resize', adjustMargin);
