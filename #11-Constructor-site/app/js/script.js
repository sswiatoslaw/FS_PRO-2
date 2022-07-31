const root = document.querySelector('.root');
const tagList = ['div', 'header', 'section', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'ul', 'li'];
let currentIndex = 0;

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

const toggleHideElement = (selector) => {
    const currentSelector = document.querySelector(selector);
    currentSelector.classList.toggle('hidden');
}


const renderTag = (object) => {
    const currentRenderedTag = document.createElement(object.tag);
    currentRenderedTag.className = object.className;
    currentRenderedTag.id = object.id;
    if(typeof object.value === 'object') {
        currentRenderedTag.append(renderTagObject(object.value));
    } else {
        currentRenderedTag.innerHTML = object.value;
    }
    return currentRenderedTag;
}

const renderTagObject = (objectValue) => renderTag(objectValue);

const renderSite = (siteObject) => {
    console.log(siteObject);
    root.innerHTML = '';
        Object.keys(siteObject).forEach((key => {
            root.append(renderTag(siteObject[key]));
        }))
}

const createElement = (tag, className, id) => {
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;

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

const createConstructorElement = (elementName) => {
    const wrapper = createElement('div', 'constructor__item', `${elementName}-wrapper`);

    const title = createElement('h6', 'constructor__item-title', `${elementName}-title`);
    title.textContent = elementName;

    const tag = createElement('select', 'constructor__item-tag', `${elementName}-tag`);
    addOptions(tagList, tag);

    const className = createElement('input', 'constructor__item-className', `${elementName}-className`);
    className.placeholder = 'Element className';

    const id = createElement('input', 'constructor__item-id', `${elementName}-id`);
    id.placeholder = 'Element id';

    const selectValue = createElement('select', 'constructor__item-selectValue', `${elementName}-selectValue`);
    addOptions(['Text', 'Tag'], selectValue);

    const valueWrapper = createElement('div', 'constructor__item-valueWrapper', `${elementName}-valueWrapper`);

    selectValue.addEventListener('change', (event) => {
        switch(event.target.value) {
            case 'text':
                valueWrapper.innerHTML = '';
                const value = createElement('input', 'constructor__item-value', `${elementName}-value`);
                value.placeholder = 'Enter text';
                valueWrapper.append(value);
                break;
            case 'tag':
                valueWrapper.innerHTML = '';
                valueWrapper.append(createConstructorElement('header-child'));
                break;
        }
    })

    const renderButton = createElement('button', 'constructor__item-render', `${elementName}-render`);
    renderButton.textContent = `Render this ${elementName}`;
    renderButton.addEventListener('click', () => {
        console.log(createTag(elementName));
    })

    wrapper.append(title, tag, className, id, selectValue, valueWrapper, renderButton)
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

    const enableSettings = createElement('input', 'sidebar__item-checkbox', `enable-settings-${elementName}`);
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

const createTag = (tagName) => {
    const tagNameArray = ['tag', 'className', 'id', 'value', 'selectValue'];
    let tagObject = {};
    tagNameArray.forEach((tag) => {
        const currentValue = document.querySelector('#' + tagName + '-' + tag);
        if(currentValue) {
            if(tag === 'selectValue' && currentValue.value === 'tag') {
                tagObject = {...tagObject, value: createTag('header-child') }
            } else {
                tagObject = {...tagObject, [tag]: currentValue.value }
            }
        }
    })
    return tagObject
}

const checkLocalStorage = () => {
    const localStorageObject = localStorage.getItem('renderSite');
    if(localStorageObject) {
        renderSite(JSON.parse(localStorageObject));
    } else {
        alert('Welcome to constructor!');
    }
}

const startConstructor = () => {
    checkLocalStorage();
}

window.onload = startConstructor();


