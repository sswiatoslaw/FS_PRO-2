const toggleMenu = () => {
    const toggleButtons = document.querySelectorAll('.header__action-menu');

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const menu = document.querySelector('.header__menu-wrapper');
            menu.classList.toggle('hidden');
        })
    })
}

toggleMenu();
