const root = document.querySelector('.root');
const tagList = ['div', 'header', 'section', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'ul', 'li'];
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
    currentRenderedTag.innerHTML = object.value;
    return currentRenderedTag;
}


const createTag = (tagName) => {
    const tagNameArray = ['tag', 'className', 'id', 'value'];
    let tagObject = {};
    tagNameArray.forEach((tag) => {
        const currentValue = document.querySelector('#' + tagName + '-' + tag);
        tagObject = {...tagObject, [tag]: currentValue.value }
    })
    return tagObject
}

const createHeader = (object) => {
    return { header: object }
}

const renderSite = (siteObject) => {
    root.innerHTML = '';
        Object.keys(siteObject).forEach((key => {
            root.append(renderTag(siteObject[key]));
        }))
}

const newTag = () => {
    const tagWrapper = document.createElement('div')
    tagWrapper.className = 'tag-wrapper';
    const tagSelect = document.createElement('select');
    tagSelect.className = 'tag-list'
    const tagInputClassName = document.createElement('input');
    tagInputClassName.id = 'tag-className';
    const tagInputId = document.createElement('input');
    tagInputId.id = 'tag-id';
    const tagSelectValue = document.createElement('select');
    tagSelectValue.id = 'tag-value-select';
    ['Text', 'Tag'].forEach((option) => {
        const tagOption = document.createElement('option');
        tagOption.value = option.toLowerCase();
        tagOption.textContent = option;
        tagSelectValue.append(tagOption);
    })
    tagWrapper.append(tagSelect);
    tagWrapper.append(tagInputClassName);
    tagWrapper.append(tagInputId);
    tagWrapper.append(tagSelectValue);
    return tagWrapper
}

const newValue = (param) => {
    const valueWrapper = document.querySelector('.header-value-wrapper');
    valueWrapper.innerHTML = '';
    if(param === 'text') {
        const valueInput = document.createElement('input');
        valueInput.id = 'header-value'
        valueInput.placeholder = 'Enter value for header'
        valueWrapper.append(valueInput);
    } else if (param === 'tag') {
        valueWrapper.append(newTag());
    }
}

const valueSelect = document.querySelector('#header-value-select');
valueSelect.addEventListener('change', (event) => {
    console.log(event.target.value);
    newValue(event.target.value);
})


const createHeaderButton = document.querySelector('#create-header-button');
createHeaderButton.addEventListener('click', (element) => {
    const siteObject = createHeader(createTag('header'));
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
window.onload = checkLocalStorage();
