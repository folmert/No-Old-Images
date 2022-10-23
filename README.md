# No Old Images (NOI, /neu̯/)
Simplifies searching for fresh content by generating CSS to hide already displayed images. You can paste the generated CSS into a style manager (i.e. [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)) to make it active permanently. Currently works only with Google Images and since it originally displays images only in base64 it requires running NOI to generate `href` on each linked image that Google Images display, in order to make the CSS active.

## Example

The idea is that once displayed images:

![image](https://user-images.githubusercontent.com/4053141/197349185-717c6c60-efc7-4c07-ae7f-8f027cb8f327.png)

are not going to be displayed again in same or any other search results (or will be grayed out):

![image](https://user-images.githubusercontent.com/4053141/197349204-1609e435-3b12-4ac8-b59d-3fdc16d6e9ea.png)
