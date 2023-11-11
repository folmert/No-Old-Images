async function hideOld() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['helpers.js', 'hideOld.js']
    });
}

async function hideNew() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['helpers.js', 'hideNew.js']
    });
}

async function downloadCSS() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['helpers.js', 'downloadCSS.js']
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn--hide-old').addEventListener('click', function (event) {
        hideOld();
    }, false);

    document.querySelector('.btn--hide-new').addEventListener('click', function (event) {
        hideNew();
    }, false);

    document.querySelector('.btn--hide-download').addEventListener('click', function (event) {
        downloadCSS();
    }, false);
});
