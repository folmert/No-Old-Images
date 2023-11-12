(async function () {
    // get old stored selectors
    let result = await getElementsFromStorage()

      console.log(0)

    let storedElements = result.storedElements
    // let storedElements = test

    console.log(1, storedElements)

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
