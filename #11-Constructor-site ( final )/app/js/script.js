const root = document.querySelector('.root');
const tagList = ['div', 'header', 'section', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'ul', 'li'];
let currentIndex = 0;
let siteObject = {};
let childObject = {};

window.addEventListener('change', () => {
    const selectList = document.querySelectorAll('select.tag-list');

    selectList.forEach((element) => {
        tagList.forEach((tag) => {
            const createdOptionTag = document.createElement('option');
            createdOptionTag.value = tag;
            createdOptionTag.textContent = tag;
            element.append(createdOptionTag);
        })
    })
})

const renderTag = (object) => {
    const currentRenderedTag = document.createElement(object.tag);
    currentRenderedTag.className = object.className;
    currentRenderedTag.id = object.id;
    if(typeof object.value === 'object') {
        object.value.forEach((element) => {
            currentRenderedTag.append(renderTagObject(element));
        })
    } else {
        currentRenderedTag.innerHTML = object.value;
    }
    return currentRenderedTag;
}

const renderTagObject = (objectValue) => renderTag(objectValue);

const renderSite = (siteObject) => {
    localStorage.setItem('siteObject', JSON.stringify(siteObject));
    root.innerHTML = '';
        Object.keys(siteObject).forEach((key => {
            root.append(renderTag(siteObject[key]));
        }))
}

function Element(tag, className, id) {
    this.tag = tag;
    this.className = className;
    this.id = id;

    const element = document.createElement(tag);
    element.className = this.className;
    element.id = this.id;

    return element;
}

const firstOption = () => {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Select option';
    option.disabled = true;
    option.selected = true;

    return option;
}

const addOptions = (array, parentElement) => {
    parentElement.append(firstOption());
    array.forEach((tag) => {
        const createdOptionTag = document.createElement('option');
        createdOptionTag.value = tag.toLowerCase();
        createdOptionTag.textContent = tag;
        parentElement.append(createdOptionTag);
    })
}

const createConstructorElement = (elementName, child) => {
    const wrapper = new Element('div', 'constructor__item', `${elementName}-wrapper`);

    const title = new Element('h6', 'constructor__item-title', `${elementName}-title`);
    title.textContent = elementName;

    const tag = new Element('select', 'constructor__item-tag', `${elementName}-tag`);
    addOptions(tagList, tag);

    const className = new Element('input', 'constructor__item-className', `${elementName}-className`);
    className.placeholder = 'Element className';

    const id = new Element('input', 'constructor__item-id', `${elementName}-id`);
    id.placeholder = 'Element id';

    const selectValue = new Element('select', 'constructor__item-selectValue', `${elementName}-selectValue`);
    addOptions(['Text', 'Tag'], selectValue);

    const valueWrapper = new Element('div', 'constructor__item-valueWrapper', `${elementName}-valueWrapper`);

    const createChildButton = new Element('button', 'constructor__item-createChildButton', `${elementName}-createChildButton`);
    createChildButton.textContent = 'Create child element';
    createChildButton.addEventListener('click', () => {
        if(childObject[elementName] >= 0) {
            childObject[elementName] = childObject[elementName] + 1;
        } else {
            childObject = {...childObject, [elementName]: 0};
        }
        valueWrapper.append(createConstructorElement(`${elementName}-child-${childObject[elementName]}`, true));
    });

    selectValue.addEventListener('change', (event) => {
        switch(event.target.value) {
            case 'text':
                valueWrapper.innerHTML = '';
                const value = new Element('input', 'constructor__item-value', `${elementName}-value`);
                value.placeholder = 'Enter text';
                valueWrapper.append(value);
                break;
            case 'tag':
                valueWrapper.innerHTML = '';
                valueWrapper.append(createChildButton);
                break;
        }
    })

    const renderButton = new Element('button', 'constructor__item-render', `${elementName}-render`);
    renderButton.textContent = `Render this ${elementName}`;
    renderButton.addEventListener('click', () => {
        siteObject = {...siteObject, [elementName]: createTag(elementName)};
        renderSite(siteObject);
    })

    wrapper.append(title, tag, className, id, selectValue, valueWrapper);
    if(!child) {
        wrapper.append(renderButton);
    }
    return wrapper
}

const newBlockButton = document.querySelector('#new-block-button');

newBlockButton.addEventListener('click', () => {
        const sidebarItem = document.querySelector('.sidebar__item');
        const newBlockName = document.querySelector('#new-block-name');
        if(newBlockName.value !== '') {
            sidebarItem.append(createSettingsElement(newBlockName.value));
        } else {
            alert('Please enter block name');
        }
        newBlockName.value = '';
});

const createSettingsElement = (elementName) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('sidebar__item-wrapper');

    const title = document.createElement('h2');
    title.classList.add('sidebar__item-title');
    title.textContent = elementName;

    const enableSettings = new Element('input', 'sidebar__item-checkbox', `enable-settings-${elementName}`);
    enableSettings.type = 'checkbox';

    enableSettings.addEventListener('click', (event) => {
        const settingsWrapper = document.querySelector(`#${elementName}-wrapper`);
        const constructor = document.querySelector('.constructor__item-wrapper');

        if(settingsWrapper) {
            settingsWrapper.classList.toggle('hidden');
        } else {
            if (event.target.checked) {
                constructor.append(createConstructorElement(elementName));
            }
        }
    })

    wrapper.append(title);
    wrapper.append(enableSettings);

    return wrapper;
}

function CreateObjectTag(tag, className, id, value) {
    this.tag = tag;
    this.className = className;
    this.id = id;
    this.value = value;
}

const findTagValue = (tagName, name) => {
    return document.querySelector('#' + tagName + '-' + name) ? document.querySelector('#' + tagName + '-' + name).value : null;
}

const createTag = (tagName) => {
    const newTag = new CreateObjectTag(
        findTagValue(tagName, 'tag'),
        findTagValue(tagName, 'className'),
        findTagValue(tagName, 'id'),
        findTagValue(tagName, 'value'));
    if(findTagValue(tagName, 'selectValue') === 'tag') {
        const currentArrayValue = [];
        for(let i = 0; i <= childObject[tagName]; i++ ){
            currentArrayValue.push(createTag(`${tagName}-child-${i}`));
            newTag.value = currentArrayValue;
        }
    } else if(findTagValue(tagName, 'selectValue') === 'text') {
        newTag.value = findTagValue(tagName, 'value');
    }
    return newTag;
}

const checkLocalStorage = () => {
    const localStorageObject = localStorage.getItem('siteObject');
    if(localStorageObject) {
        renderSite(JSON.parse(localStorageObject));
        console.log(JSON.parse(localStorageObject));
    } else {
        alert('Welcome to constructor!');
    }
}

const startConstructor = () => {
    checkLocalStorage();
}

window.onload = startConstructor();


