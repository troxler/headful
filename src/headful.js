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
    image(val) {
        setMetaContent('itemprop="image"', val);
        setMetaContent('property="og:image"', val);
        setMetaContent('name="twitter:image"', val);
    },
};

function headful(props, userConf) {
    Object.assign(conf, userConf);
    Object.keys(props).forEach(prop => {
        if (!propertySetters.hasOwnProperty(prop)) {
            throw new Error(`Headful: Property '${prop}' is unknown.`);
        }
        propertySetters[prop](props[prop]);
    });
}

headful.props = propertySetters;

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
