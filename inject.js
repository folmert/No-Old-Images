// this is the code which will be injected into a given page...

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

    const rightClick = function (element) {
        var evt = element.ownerDocument.createEvent('MouseEvents');

        var RIGHT_CLICK_BUTTON_CODE = 2;

        evt.initMouseEvent('click', true, true,
            element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false,
            false, false, false, RIGHT_CLICK_BUTTON_CODE, null);

        return !element.dispatchEvent(evt);
    }

    if (window.location.href.indexOf("tbm=isch") === -1) {
        alert("Please use No Old Images only on google image search");
        return;
    }

    // get not clicked images
    let imagesNotClicked = document.querySelectorAll('div[data-id] a:not([href])');

    // click on each not clicked links to generate their hrefs
    (function myLoop (i) {
        setTimeout(function () {
            if (!imagesNotClicked[i]) return;

            rightClick(imagesNotClicked[i]);

            // close img with 'x'
            setTimeout(function () {
                if (document.querySelectorAll('div[role="main"] + div svg')[0]?.closest('div')) {
                    document.querySelectorAll('div[role="main"] + div svg')[0].closest('div').click();
                }
            }, 2);

        }, 30);
        if (--i && i > 1) myLoop(i); // decrement i and call myLoop again if i > 1
    })(imagesNotClicked.length - 1);

    // get links of clicked imgs
    let imagesClicked = document.querySelectorAll('div[data-id] a:not([target="_blank"])')

    // get hrefs of clicked links
    let hrefs = Array.from(imagesClicked)
        .filter(i => i.href.length && i.href)
        .map(i => i.href.split('&')[0] // first param is imgurl
        .split('https://www.google.com')[1]); // we don't need absolute path

    // google divs have bg color, so hide them instead images
    let hrefsAsCssSelectors = hrefs.map(href => `a[href^="${href}"] div`);
    let cssString = `${hrefsAsCssSelectors.join()} { opacity: 0.2 }`;

    generateFile(cssString, 'No-Old-Images.css');
})();
