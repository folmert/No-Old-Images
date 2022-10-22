async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['inject.js']
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', function (event) {
        injectScript();
    }, false);
});
