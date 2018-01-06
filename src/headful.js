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
    setAttr('meta', attr, 'content', val);
}

function setAttr(el, attr, key, val) {
    const selector = `${el}[${attr}]`;
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(key, val);
    } else if (conf.debug) {
        console.error(`Headful: Element <${el} ${attr}> was not found.`);
    }
}
