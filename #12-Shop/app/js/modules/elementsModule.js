const addClasses = (currentElement, classList) => {
        currentElement.classList.add(...classList);
}

const removeClasses = (currentElement, classList) => {
    currentElement.classList.remove(...classList);
}

const addId = (currentElement, id) => {
    currentElement.id = id;
}

const addAttr = (currentElement, key, value) => {
    currentElement[key] = value;
}

const createElement = ({tagName, classList, id, data, attr}) => {
    const currentElement = document.createElement(tagName);
    classList && addClasses(currentElement, classList);
    id && addId(currentElement, id);
    if(typeof data === 'string') {
        currentElement.textContent = data;
    }
    if(attr) {
        Object.keys(attr).forEach((key) => {
            addAttr(currentElement, key, attr[key]);
        })
    }
    return currentElement
}

export {addClasses, removeClasses, addId, addAttr, createElement}