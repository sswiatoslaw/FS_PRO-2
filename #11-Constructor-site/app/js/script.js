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

const createTag = (tagName, tagIndex) => {
    const tagNameArray = ['tag', 'className', 'id', 'value', 'value-select'];
    let tagObject = {};
    tagNameArray.forEach((tag) => {
        const currentValue = document.querySelector('#' + tagName + '-' + tag + '-' + tagIndex);
        if(currentValue) {
            if(tag === 'value-select' && currentValue.value === 'tag') {
                tagObject = {...tagObject, value: createTagObject('tag', currentIndex) }
            } else {
                console.log(currentValue);
                tagObject = {...tagObject, [tag]: currentValue.value }
            }
        }
    })
    return tagObject
}

const createTagObject = (tagName, tagIndex) => createTag(tagName, tagIndex);

const createHeader = (object) => {
    return { header: object }
}

const renderSite = (siteObject) => {
    console.log(siteObject);
    root.innerHTML = '';
        Object.keys(siteObject).forEach((key => {
            root.append(renderTag(siteObject[key]));
        }))
}

const newTag = (index, tagName) => {
    const tagWrapper = document.createElement('div')
    tagWrapper.className = 'tag__wrapper';
    const tagH6 = document.createElement('h6');
    tagH6.textContent = 'tag ' + index;
    const tagSelect = document.createElement('select');
    tagSelect.className = 'tag-list'
    tagSelect.id = 'tag-tag-' + index
    const tagInputClassName = document.createElement('input');
    tagInputClassName.id = 'tag-className-' + index;
    tagInputClassName.placeholder = 'element className';
    const tagInputId = document.createElement('input');
    tagInputId.id = 'tag-id-' + index;
    tagInputId.placeholder = 'element id';
    const tagSelectValue = document.createElement('select');
    tagSelectValue.id = 'tag-value-select-' + index;
    ['Text', 'Tag'].forEach((option) => {
        const tagOption = document.createElement('option');
        tagOption.value = option.toLowerCase();
        tagOption.textContent = option;
        tagSelectValue.append(tagOption);
    })

    const valueWrapperTag = document.createElement('div');
    valueWrapperTag.className = `value-wrapper-${index + 1}`;

    const tagInputValue = document.createElement('input');
    tagInputValue.id = 'tag-value-' + index;
    valueWrapperTag.append(tagInputValue);

    createEventListenerChanges(tagSelectValue, index, 'tag');
    tagWrapper.append(tagH6);
    tagWrapper.append(tagSelect);
    tagWrapper.append(tagInputClassName);
    tagWrapper.append(tagInputId);
    tagWrapper.append(tagSelectValue);
    tagWrapper.append(valueWrapperTag);
    return tagWrapper
}

const newValue = (param, index, tagName) => {
    console.log(param, index, tagName);
    const valueWrapper = document.querySelector(`.value-wrapper-${index}`);
    valueWrapper.innerHTML = '';
    if(param === 'text') {
        const valueInput = document.createElement('input');
        valueInput.id = `${tagName}-value-0`
        valueInput.placeholder = `Enter value for ${tagName}`
        valueWrapper.append(valueInput);
    } else if (param === 'tag') {
        valueWrapper.append(newTag(index, tagName));
    }
}

const valueSelect = document.querySelector('#header-value-select-0');

const createEventListenerChanges = (element, index, tagName) => {
    element.addEventListener('change', (event) => {
        newValue(event.target.value, currentIndex, tagName);
        currentIndex++;
    })
}


const createHeaderButton = document.querySelector('#create-header-button');

createHeaderButton.addEventListener('click', (element) => {
    const siteObject = createHeader(createTag('header', 0));
    localStorage.setItem('renderSite', JSON.stringify(siteObject));
    renderSite(siteObject);
});

const headerActive = document.querySelector('#header-active');
headerActive.addEventListener('click', (element) => {
    if(element.target.checked){
        toggleHideElement('.sidebar__item-content');
    } else {
        toggleHideElement('.sidebar__item-content');
    }
})

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
    createEventListenerChanges(valueSelect, 0, 'header');
}
window.onload = startConstructor()  ;


