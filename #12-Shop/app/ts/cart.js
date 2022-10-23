import { previewProductBlock } from '../js/modules/productModule.js';
const checkLocalCart = () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
        const cart = JSON.parse(localCart);
        return {
            availiable: !!cart,
            cart: cart,
            index: cart.length
        };
    }
    else {
        return null;
    }
};
const cartIndex = document.querySelectorAll('.header__action-cartIndex');
const cartDetails = checkLocalCart();
cartIndex.forEach((element) => {
    if (cartDetails) {
        if (cartDetails.availiable) {
            element.textContent = String(cartDetails.index);
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    }
});
const cartButtons = document.querySelectorAll('.header__action-cart');
cartButtons.forEach((cartButton) => {
    cartButton.addEventListener('click', () => {
        const cartWrapper = document.querySelector('.header__cart-wrapper');
        const cart = document.querySelector('.header__cart');
        const localCart = checkLocalCart();
        if (!localCart) {
            if (cartWrapper) {
                cartWrapper === null || cartWrapper === void 0 ? void 0 : cartWrapper.classList.add('empty');
                cartWrapper.textContent = 'Корзина пустая';
            }
        }
        else {
            const cartAmount = document.querySelector('.header__cart-amount');
            const cartPrice = document.querySelector('.header__cart-price');
            let totalPrice = 0;
            localCart.cart.forEach((item) => {
                totalPrice += +item.price;
                if (cartPrice) {
                    cartPrice.textContent = `${totalPrice} ₴`;
                    cart === null || cart === void 0 ? void 0 : cart.append(previewProductBlock(item));
                }
            });
            if (cartAmount) {
                if (localCart.index <= 4) {
                    cartAmount.textContent = `${localCart.index} товара`;
                }
                else if (localCart.index >= 5) {
                    cartAmount.textContent = `${localCart.index} товаров`;
                }
            }
        }
        cartWrapper === null || cartWrapper === void 0 ? void 0 : cartWrapper.classList.toggle('hidden');
    });
});
