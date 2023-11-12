/**
 * Same as hideNew but doesn't update selectors with new images
 */ 
(async function () {
    // get old stored selectors
    let result = await getElementsFromStorage()
    let storedElements = result.storedElements

    await clickOnLinkedImages()

    // append style tag
    let chunkedSelectors = chunkSelectors(storedElements, 2000)
    elementsToStyleTag(chunkedSelectors)
})();
