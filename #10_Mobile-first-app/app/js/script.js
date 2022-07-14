const menuButton = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

const changeHeader = (widthScreen) => {
    if (widthScreen > 768) {
        menu.classList.remove('header__menu-mobile', 'hidden');
    } else {
        menu.classList.add('header__menu-mobile', 'hidden');
    }
}

const changeResolution = () => {
    const widthScreen = window.innerWidth;
    changeHeader(widthScreen);
}

onload = changeResolution();

menuButton.addEventListener('click', (event) => {
    const defaultButton = '/images/menu-button.svg';
    if (event.target.src === location.origin + defaultButton) {
        event.target.src = './images/menu-button-close.svg';
    } else {
        event.target.src = '.' + defaultButton;
    }
    menu.classList.toggle('hidden');
})

window.addEventListener('resize', () => mediaRequests());


