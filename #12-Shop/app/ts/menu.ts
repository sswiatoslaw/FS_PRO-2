const toggleButtons = document.querySelectorAll('.header__action-menu');

toggleButtons.forEach((button: Element) => {
    button.addEventListener('click', () => {
        const menu = document.querySelector('.header__menu-wrapper');
        menu?.classList.toggle('hidden');

        window.addEventListener('click', (event: Event) => {
            const target: any = event.target;
            if(
                !target.closest('.header__menu-wrapper') &&
                 !target.closest('.header__action-menu')
                 ) {
                menu?.classList.add('hidden');
            }
            if(target.closest('.header__action-cart')) {
                menu?.classList.add('hidden');
            }
        })
    })
})