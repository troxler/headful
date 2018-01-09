export default headful;

const conf = {
    debug: false,
};

const propertySetters = {
    title(val) {
        document.title = val;
        setMetaContent('itemprop="name"', val);
        setMetaContent('property="og:title"', val);
        setMetaContent('name="twitter:title"', val);
    },
    description(val) {
        setMetaContent('name="description"', val);
        setMetaContent('itemprop="description"', val);
        setMetaContent('property="og:description"', val);
        setMetaContent('name="twitter:description"', val);
    },
    keywords(val) {
        setMetaContent('name="keywords"', Array.isArray(val) ? val.join(', ') : val);
    },
    image(val) {
        setMetaContent('itemprop="image"', val);
        setMetaContent('property="og:image"', val);
        setMetaContent('name="twitter:image"', val);
    },
    lang(val, props) {
        setAttributes('html', {lang: val});
        noProp(props, this.ogLocale) && setOgLocaleIfValid(val);
    },
    ogLocale(val) {
        setMetaContent('property="og:locale"', val);
    },
};

function headful(props, userConf) {
    Object.assign(conf, userConf);
    Object.keys(props).forEach(prop => {
        if (!propertySetters.hasOwnProperty(prop)) {
            throw new Error(`Headful: Property '${prop}' is unknown.`);
        }
        propertySetters[prop](props[prop], props);
    });
}

headful.props = propertySetters;

/**
 * Tests whether the given `props` object contains a property with the name of `propNameOrFunction`.
 */
function noProp(props, propNameOrFunction) {
    if (!props) {
        throw new Error('Headful: You must pass all declared props when you use headful.props.x() calls.');
    }
    const propName = typeof propNameOrFunction === 'function' ? propNameOrFunction.name : propNameOrFunction;
    return !props.hasOwnProperty(propName);
}

function setMetaContent(attr, val) {
    setAttributes(`meta[${attr}]`, {content: val});
}

function setAttributes(selector, attributes) {
    const element = document.querySelector(selector);
    if (element) {
        Object.keys(attributes).forEach(attrName => element.setAttribute(attrName, attributes[attrName]));
    } else if (conf.debug) {
        console.error(`Headful: Element '${selector}' was not found.`);
    }
}

function setOgLocaleIfValid(locale) {
    if (locale.match(/^[a-z]{2}-[a-z]{2}$/i)) {
        const [language, region] = locale.split('-');
        const ogLocale = `${language}_${region.toUpperCase()}`;
        propertySetters.ogLocale(ogLocale);
    }
}
