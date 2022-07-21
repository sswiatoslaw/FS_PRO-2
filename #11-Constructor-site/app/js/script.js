const root = document.querySelector('.root');

const headerActive = document.querySelector('#header-active');

const toggleHideElement = (selector) => {
    const currentSelector = document.querySelector(selector);
    currentSelector.classList.toggle('hidden');
}

const toggleCreateMenu = (isActive) => {
    const createMenuCheckbox = document.querySelector('#create-menu');
    createMenuCheckbox.addEventListener('click', (event) => {
        console.log(event);
        if(event.target.checked && isActive) {
            toggleHideElement('#create-menu-wrapper');
        } else {
            toggleHideElement('#create-menu-wrapper');
        }
    })
}

const createHeader = (title) => {
    const header = document.createElement('header');
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = title;
    header.append(headerTitle);
    header.append(createMenu());
    return header;
}

const renderHeader = (isActive) => {
    const createHeaderButton = document.querySelector('#create-header-button');
    createHeaderButton.addEventListener('click', (element) => {
        if (isActive) {
            const headerTitle = document.querySelector('#header-title');
            if (headerTitle.value !== '') {
                root.append(createHeader(headerTitle.value))
                element.target.classList.remove('error');
            } else {
                element.target.classList.add('error');
            }
            // headerTitle.value !== '' && root.append(createHeader(headerTitle.value));
        }
    })
}

const createMenu = () => {
    const headerMenu = [];
    for(let i = 0; i < 3; i++) {
        console.log(i)
        const currentInput = document.querySelector('.create-menu-' + i);
        console.log(currentInput);
        currentInput.value !== '' && headerMenu.push(currentInput.value);
    }
    const nav = document.createElement('nav');
    nav.className = 'header__menu';
    headerMenu.forEach(text => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = text;
        nav.append(link);
    })
    return nav
}

headerActive.addEventListener('click', (element) => {
    if(element.target.checked){
        toggleHideElement('.sidebar__item-content');
        renderHeader(element.target.checked);
        toggleCreateMenu(element.target.checked);
    } else {
        toggleHideElement('.sidebar__item-content');
    }
})
