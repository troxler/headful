# Headful

Headful is a small JavaScript library to set properties in the HTML `<head>` (for example `<title>` and meta tags).

**Important**:
Most properties supported by Headful are only useful when they are set *before* the browser executes the JavaScript.
For example, you won't be able to change properties used for URL sharing on social networks (e.g. Facebook, Twitter) or messengers (WhatsApp, Telegram).
That means you should either prerender your pages before the deployment or use server-side rendering.

*PS: Are you using Vue.js? Then you should checkout [vue-headful](https://github.com/troxler/vue-headful) instead.*


## Install

```
npm i headful
```


## Usage

```js
import headful from 'headful';

headful({
    title: 'Title from Headful',
    description: 'Description from Headful',
});
```

Note that Headful does *not* add missing HTML elements, it only adds attribute values.
So it is important that you add everything that you want to have populated in your HTML first.

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta itemprop="name">
    <meta property="og:title">
    <meta name="twitter:title">
    <meta name="description"/>
    <meta itemprop="description">
    <meta property="og:description">
    <meta name="twitter:description">
    <script src="script.js"></script>
</head>
<body>
<!-- ... -->
</body>
</html>
```


## Documentation

Headful supports several different head properties.
Below you can find a list of Headful properties and for each of them which elements they populate.

For more information on everything you can put into `<head>`, have a look at <https://gethead.info/>.

```js
import headful from 'headful';

headful({
    title: '',
    // * <title>
    // * <meta itemprop="name">
    // * <meta property="og:title">
    // * <meta name="twitter:title">

    description: '',
    // * <meta name="description">
    // * <meta itemprop="description">
    // * <meta property="og:description">
    // * <meta name="twitter:description">

    keywords: '',
    // string or array
    // * <meta name="keywords">

    image: '',
    // * <meta itemprop="image">
    // * <meta property="og:image">
    // * <meta name="twitter:image">

    lang: '',
    // * <html lang>
    // * <meta property="og:locale"> - only for language codes like ll-CC

    ogLocale: '',
    // * <meta property="og:locale">
    
    url: '',
    // <link rel="canonical">
    // <meta property="og:url">
    // <meta name="twitter:url">
    
    html: {
        selector1: {attr1: 'val1', attr2: 'val2'},
        selector2: {attr1: 'val1', attr2: 'val2'},
    },
    // add/change arbitrary attributes on elements in the overall document using CSS selectors

    head: {
        selector1: {attr1: 'val1', attr2: 'val2'},
        selector2: {attr1: 'val1', attr2: 'val2'},
    },
    // add/change arbitrary attributes on elements within the <head> using CSS selectors

});
```

Note that are some head properties that can be specified with different Headful property names (e.g. `<meta property="og:locale">`).
There is always one Headful property that tries to set as many head properties as possible (e.g. `lang`).
But if you also specify another conflicting Headful property (e.g. `ogLocale`), then the more specific one will win.
See the example below.

```js
headful({
    // Sets <html lang="en-GB"> and <meta property="og:locale" content="en_GB">
    lang: 'en-GB',
});


headful({
    // Sets <html lang="en-AU"> and does not change <meta property="og:locale"> as we also specify 'ogLocale'
    lang: 'en-AU',

    // Sets <meta property="og:locale" content="en_GB"> only
    ogLocale: 'en_GB',
});
```

If you want to **remove a previously defined attribute from an element**, you can set it to `null` or `undefined` as in the example below:

```js
headful({ title: 'Headful' });
// <title>Headful</title>
// <meta itemprop="name" content="Headful">
// <meta property="og:title" content="Headful">
// <meta name="twitter:title" content="Headful">

headful({ title: null });
// <title></title>
// <meta itemprop="name">
// <meta property="og:title">
// <meta name="twitter:title">
```


## Compatibility

Headful works with every current and most reasonably old web browsers including:

* Firefox 34+
* Chrome 45+
* Edge
* Safari 9+

If you need to support even more browsers (including Internet Explorer), you have to add a polyfill for
[`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
(e.g. with [core-js](https://github.com/zloirock/core-js)).
When you do that, the following browsers are supported:

* Firefox 4+
* Chrome 5+
* Edge
* Safari 5+
* Internet Explorer 9+


## Extensions

* [vue-headful](https://github.com/troxler/vue-headful) - Headful wrapper for Vue.js
