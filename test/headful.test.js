import test from 'ava';
import headful from '../dist/headful';

const fs = require('fs');
const {JSDOM} = require('jsdom');


const html = fs.readFileSync(`${__dirname}/../demo/index.html`);
const dom = new JSDOM(html);

// make dom document available to Headful
// TODO Find another way as JSDOM advises against this approach: https://github.com/tmpvar/jsdom#executing-scripts
global.document = dom.window.document;


function getDocument() {
    return dom.window.document;
}

function getElementAttr(selector, attr) {
    return getDocument().querySelector(selector).attributes[attr].value;
}

function getMetaContent(selector) {
    return getElementAttr(`meta[${selector}]`, 'content');
}


test('title', t => {
    headful({title: 'headful'});
    t.is(getDocument().title, 'headful');
    t.is(getMetaContent('itemprop="name"'), 'headful');
    t.is(getMetaContent('property="og:title"'), 'headful');
    t.is(getMetaContent('name="twitter:title"'), 'headful');
});

test('description', t => {
    headful({description: 'headful'});
    t.is(getMetaContent('name="description"'), 'headful');
    t.is(getMetaContent('itemprop="description"'), 'headful');
    t.is(getMetaContent('property="og:description"'), 'headful');
    t.is(getMetaContent('name="twitter:description"'), 'headful');
});

test('keywords', t => {
    headful({keywords: 'head, ful'});
    t.is(getMetaContent('name="keywords"'), 'head, ful');
    headful({keywords: ['head', 'ful']});
    t.is(getMetaContent('name="keywords"'), 'head, ful');
});

test('image', t => {
    const imageUrl = 'http://example.com/preview.png';
    headful({image: imageUrl});
    t.is(getMetaContent('itemprop="image"'), imageUrl);
    t.is(getMetaContent('property="og:image"'), imageUrl);
    t.is(getMetaContent('name="twitter:image"'), imageUrl);
});

test('lang', t => {
    headful({lang: 'de-CH'});
    t.is(getElementAttr('html[lang]', 'lang'), 'de-CH');
    t.is(getMetaContent('property="og:locale"'), 'de_CH');
    headful({lang: 'de'});
    t.is(getElementAttr('html[lang]', 'lang'), 'de');
    t.is(getMetaContent('property="og:locale"'), 'de_CH');
    headful({lang: 'en-AU', ogLocale: 'en-GB'});
    t.is(getElementAttr('html[lang]', 'lang'), 'en-AU');
    t.is(getMetaContent('property="og:locale"'), 'en-GB');
});
