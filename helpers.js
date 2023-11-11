if (window.location.href.indexOf("tbm=isch") === -1) {
	// console.log("this is not google image search");
}

/**
 * Transform array of elements to CSS and append as <style> tag
 */ 
function elementsToStyleTag(elements) {
	// console.log('elementsToStyleTag');

	let cssString = ''
	elements.forEach(selectors => {
            cssString += `${selectors.join(',\n')} { opacity: 0.1 }\n`; // each chunk gets a separate CSS rule
        })

    cssString = cssString.replace(/"%27"/g, "\'"); // in the browser %27 is sometimes automatically transformed to '

    let style = document.createElement('style');
    style.innerHTML = cssString;
    document.head.appendChild(style);

    // console.log('<style> tag has been added')
    return cssString
}

/**
 * Get currently stored elements
 */ 
async function getElementsFromStorage() {
	return await chrome.storage.local.get(["storedElements"]).then((result) => {
        // console.log("Last 5 stored elements: ", result?.storedElements.slice(-5), ', total elements: ' + result?.storedElements?.length);

        return result
    });
}

/**
 * Persistently store elements to be hidden as storedElements
 */ 
async function storeElements(elements) {
	// console.log('storeElements');

	await chrome.storage.local.set({ storedElements: elements }).then(() => {
		// console.log("elements have been stored");
	});

	await getElementsFromStorage();
}

/**
 * ['f', 'o', 'o', 'b', 'a', 'r'] -> [['f', 'o', 'o'], ['b', 'a', 'r']]
 * Needed because if a single css rule contains over 4096 selectors it creates an overflow on selector specificity
 **/
function chunkSelectors(selectors, chunkSize) {
	// console.log('chunkSelectors');

	return Array.from({length: Math.ceil(selectors.length / chunkSize)}, (_, i) =>
		selectors.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

/**
 *  Add new found elements to stored elements without duplicates
 */ 
function mergeSelectors(oldSelectors, newSelectors) {
	// console.log('mergeSelectors')

	return Array.from(new Set([...(oldSelectors ?? []), ...newSelectors]));
}

/**
 * Click on all (visible) <a> elements so they get href attribute
 * (needed only by google images)
 */ 
async function clickOnLinkedImages() {
	// console.log('clickOnAllLinkedImages')

	let triggerMouseEvent = function triggerMouseEvent (node, eventType) {
		let clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent(eventType, true, true);
		node.dispatchEvent(clickEvent);
	}
	let imagesNotClicked = document.querySelectorAll('div[data-id] a:not([href])');

	for (let i = 0; i < imagesNotClicked.length; i++) {
		// do not click on already hidden images
		if (getComputedStyle(imagesNotClicked[i]).getPropertyValue("opacity") !== '0.1') {
			triggerMouseEvent(imagesNotClicked[i], "mousedown");
		}
	}
}

/**
 *  Click on each not clicked links to generate their hrefs
 */ 
function clickedImagesToSelectors() {
	// console.log('clickedImagesToSelectors')

	// get links of clicked imgs
	let imagesClicked = document.querySelectorAll('div[data-id] a:not([target="_blank"])')

    // get hrefs of clicked links
	let hrefs = Array.from(imagesClicked)
					.filter(i => i.href.length && i.href)
            		.map(i => i.href.split('&')[0] // first param is imgurl
            		.split('https://www.google.com')[1]); // we don't need absolute path

    // google divs have bg color, so hide them instead images
    let hrefsAsCssSelectors = hrefs.map(href => `a[href^="${href}"] div`);
    hrefsAsCssSelectors.sort();

    return hrefsAsCssSelectors
}

/**
 * Creates a file for downloading
 */ 
const generateFile = (function () {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            let blob = new Blob([data], { type: "octet/stream" });
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
