# Headful

Headful is a small JavaScript library to set properties in the HTML `<head>` (for example `<title>` and meta tags).

**Important**:
Most properties supported by Headful are only useful when they are set *before* the browser executes the JavaScript.
For example, you won't be able to change properties used for URL sharing on social networks (e.g. Facebook, Twitter) or messengers (WhatsApp, Telegram).
That means you should either prerender your pages before the deployment or use server-side rendering.


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
Below you can find a list of properties and for each of them which elements they populate.

For more information on everything you can put into `<head>`, have a look at <https://gethead.info/>.

```js
import headful from 'headful';

headful({
    title: '',
    // * <title>

    description: '',
    // * <meta name="description">
    // * <meta itemprop="description">
    // * <meta property="og:description">
    // * <meta name="twitter:description">

    image: '',
    // * <meta itemprop="image">
    // * <meta property="og:image">
    // * <meta name="twitter:image">
});
```
