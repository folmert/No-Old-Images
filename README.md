# No Old Images (NOI, /neu̯/)
Simplifies searching for fresh content by generating CSS to hide already displayed images. You can paste the generated CSS into a style manager (i.e. [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)) to make it active permanently. Currently works only with Google Images and since it originally displays almost all images in base64 it requires running NOI to generate `href` on each linked image in order to make CSS selectors valid.

## Showcase

The idea is that once displayed images:

![image](https://user-images.githubusercontent.com/4053141/197349185-717c6c60-efc7-4c07-ae7f-8f027cb8f327.png)

are not going to be displayed again in same or any other search results (or will be grayed out):

![image](https://user-images.githubusercontent.com/4053141/197349204-1609e435-3b12-4ac8-b59d-3fdc16d6e9ea.png)

## How it works

### Example of generated CSS
NOI adresses images by its parent's (`<a>`) `href` attribute. If you look at the HTLM structure of Google Images you will understand why.

```
a[href^="/imgres?imgurl=http%3A%2F%2Fmed.stanford.edu%2Fcontent%2Fdam%2Fsm-news%2Fimages%2F2021%2F09%2Fcat_by-Kateryna-T-Unsplash.jpg"] div,
a[href^="/imgres?imgurl=http%3A%2F%2Fwww.goodnet.org%2Fphotos%2F620x0%2F32439_hd.jpg"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Fanimals.sandiegozoo.org%2Fsites%2Fdefault%2Ffiles%2F2020-08%2Fblack-footed.jpg"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost.s3.amazonaws.com%2Fpublic%2FWALN4MAIT4I6VLRIPUMJQAJIME.jpg"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Fassets.publishing.service.gov.uk%2Fgovernment%2Fuploads%2Fsystem%2Fuploads%2Fimage_data%2Ffile%2F137286%2Fs960_Untitled_design__15_.png"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Fc.ndtvimg.com%2F2020-08%2Fh5mk7js_cat-generic_625x300_28_August_20.jpg"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F04%2F148204-050-C1EEF14A%2Fbreed-Scottish-trait-cat-mutation-ears-ear.jpg"] div,
a[href^="/imgres?imgurl=https%3A%2F%2Fychef.files.bbci.co.uk%2F976x549%2Fp07ryyyj.jpg"] div { 
	opacity: 0.2;
}
```

### HTML structure of Google Images
Before `mousedown` event is triggered on `<a>` element:
```
<a class="wXeWr islib nfEiy" jsname="sTFXNd" tabindex="0" role="button" 
   jsaction="J9iaEb;mousedown:npT2md; touchstart:npT2md;" data-nav="1" style="height: 180px;">
    <div class=" bRMDJf islir" jsname="DeysSe" style="height: 194px;">
        <img
            src="data:image/jpeg;base64,/9j…IAiIgCIiAIiIAiIgCIiAIiID/9k="
            data-deferred="1" class="rg_i Q4LuWd" jsname="Q4LuWd" width="145" height="194" alt="house cat - Wikidata"
            data-atf="true" data-iml="1438">
    </div>
    <div class="c7cjWc mvjhOe"></div>
</a>
```

After `mousedown` event is triggered on `<a>` element:
```
<a class="wXeWr islib nfEiy" jsname="sTFXNd" tabindex="0" role="button" 
   jsaction="J9iaEb;mousedown:npT2md; touchstart:npT2md;" data-nav="1" style="height: 180px;" 
   href="/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F4%2F4d%2FCat_November_2010-1a.jpg%2F1200px-Cat_November_2010-1a.jpg&amp;imgrefurl=https%3A%2F%2Fwww.wikidata.org%2Fwiki%2FQ146&amp;tbnid=U6GpUslQrdCfcM&amp;vet=12ahUKEwjAjcTH8fb6AhUaJcUKHZWzA0EQMygCegUIARDmAQ..i&amp;docid=_Xck-vPrSARjYM&amp;w=1200&amp;h=1602&amp;q=cat&amp;ved=2ahUKEwjAjcTH8fb6AhUaJcUKHZWzA0EQMygCegUIARDmAQ" data-navigation="server">
    <div class=" bRMDJf islir" jsname="DeysSe" style="height: 194px;">
        <img
            src="data:image/jpeg;base64,/9j…IAiIgCIiAIiIAiIgCIiAIiID/9k="
            data-deferred="1" class="rg_i Q4LuWd" jsname="Q4LuWd" width="145" height="194" alt="house cat - Wikidata"
            data-atf="true" data-iml="1438">
    </div>
    <div class="c7cjWc mvjhOe"></div>
</a>
```
