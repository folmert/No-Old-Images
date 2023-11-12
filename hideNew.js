(async function () {
    // get old stored selectors
    let result = await getElementsFromStorage()

    let storedElements = result.storedElements

    // update selectors
    await clickOnLinkedImages()
    hrefsAsCssSelectors = clickedImagesToSelectors()
    hrefsAsCssSelectors = mergeSelectors(storedElements, hrefsAsCssSelectors)
    storeElements(hrefsAsCssSelectors)

    // append style tag
    let chunkedSelectors = chunkSelectors(hrefsAsCssSelectors, 2000)
    elementsToStyleTag(chunkedSelectors)

    // TODO: automatically click on links when scrolling? so that CSS is activated
    // TODO: generate elements to json file and add import
})();
