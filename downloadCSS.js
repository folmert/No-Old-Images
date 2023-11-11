/**
 * Downloads stored CSS as .css file
 */ 
(async function () {
    let result = await getElementsFromStorage()
    let storedElements = result.storedElements

    let cssString = elementsToStyleTag(chunkSelectors(storedElements, 2000))

    generateFile(cssString, 'No-Old-Images.css');
})();
