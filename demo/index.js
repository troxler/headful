import headful from '../src/headful';

document.addEventListener('DOMContentLoaded', function () {
    headful({
        title: 'Headful title',
        description: 'Headful description',
        image: 'http://example.com/preview.png',
    }, {debug: true});
});
