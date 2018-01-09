import headful from '../src/headful';

document.addEventListener('DOMContentLoaded', function () {
    headful({
        title: 'Headful title',
        description: 'Headful description',
        keywords: ['example', 'head', 'javascript'],
        image: 'http://example.com/preview.png',
        lang: 'en-US',
    }, {debug: true});
});
