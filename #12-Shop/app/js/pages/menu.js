import { Server } from "./main/classes.js";
import { previewProductBlock } from '../modules/productModule.js'


const checkLocalCart = () => {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if(localCart) {
        return {
            availiable: !!localCart,
            cart: localCart,
            index: localCart.length
        }
    } else {
        return null
    }
}

const server = new Server();

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

const cartButtons = document.querySelectorAll('.header__action-cart');

cartButtons.forEach((cartButton) => {
    cartButton.addEventListener('click', () => {
        const cartWrapper = document.querySelector('.header__cart-wrapper');
        const cart = document.querySelector('.header__cart');
        const localCart = checkLocalCart();
        if(!localCart) {
            cartWrapper.classList.add('empty');
            cartWrapper.textContent = 'Корзина пустая'
        } else {
            const cartAmount = document.querySelector('.header__cart-amount');
            const cartPrice = document.querySelector('.header__cart-price');
            let totalPrice = 0;
            localCart.cart.forEach((item) => {
                totalPrice += +item.price;
                cartPrice.textContent = `${totalPrice} ₴`;
                cart.append(previewProductBlock(item));
            })

            if(localCart.index <= 4) {
                cartAmount.textContent = `${localCart.index} товара`
            } else if (localCart.index >= 5) {
                cartAmount.textContent = `${localCart.index} товаров`
            }
        }
        cartWrapper.classList.toggle('hidden');
    })
})

const searchInput = document.querySelector(".header__search");

searchInput.addEventListener('change', (event) => {
    const searchDropdown = document.querySelector('.header__search-dropdown');
    searchDropdown.innerHTML = "";
    if (event.target.value !== "") {
        searchDropdown.classList.remove('hidden');
        searchInput.classList.add('active');
        server.request(`products?q=${event.target.value}`).then((response) => {
            response.forEach((item) => {
                searchDropdown.append(previewProductBlock(item));
            })
        })
    } else {
        searchDropdown.classList.add('hidden');
        searchInput.classList.remove('active');

    }
})

const renderCartIndex = () => {
    const cartIndex = document.querySelectorAll('.header__action-cartIndex');
    const cartDetails = checkLocalCart();
    cartIndex.forEach((element) => {
        if(cartDetails) {
            if (cartDetails.availiable) {
                element.textContent = cartDetails.index;
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    })
}

renderCartIndex();

