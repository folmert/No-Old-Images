// this is the code which will be injected into a given page...
// max lines generated so far: 535

(function () {
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

    let triggerMouseEvent = function triggerMouseEvent (node, eventType) {
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

    if (window.location.href.indexOf("tbm=isch") === -1) {
        alert("Please use No Old Images only on google image search");
        return;
    }

    // get not clicked images
    let imagesNotClicked = document.querySelectorAll('div[data-id] a:not([href])');

    let preloader = document.createElement('div');
    preloader.innerText = 'Generating hrefs, please wait...'
    preloader.classList.add('preloader');
    preloader.style.cssText = 'display:flex;justify-content:center;align-items:center;color:white;font-size:60px;cursor:wait,pointer-event:none;position:fixed;top:0;left:0;width:100%;height:100%;opacity:0.6;z-index:100;background:#000;';
    document.body.appendChild(preloader);
    document.querySelector('body').style.cssText = 'overflow-y:hidden';

    // click on each not clicked links to generate their hrefs
    let delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    let generateHrefs = async function () {
        for (let i = 0; i < imagesNotClicked.length; i++) {
            if (!imagesNotClicked[i]) return;
            triggerMouseEvent(imagesNotClicked[i], "mousedown");
        }

        await delay(3); // creates a Promise and resolves it after 30 ms, perhaps not needed anymore
    };

    generateHrefs().then(() => {
        preloader.remove();
        document.querySelector('body').style.cssText = '';

        // close img with 'x'
        setTimeout(function () {
            if (document.querySelectorAll('div[role="main"] + div svg')[0]?.closest('div')) {
                document.querySelectorAll('div[role="main"] + div svg')[0].closest('div').click();
            }
        }, 2);

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
        let cssString = `${hrefsAsCssSelectors.join(',\n')} { opacity: 0.2 }`;

        generateFile(cssString, 'No-Old-Images.css');
    });
})();
