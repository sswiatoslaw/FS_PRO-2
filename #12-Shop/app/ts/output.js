var user = "Hello world!";
console.log(user);
var user1;
user1 = "1";
user1 = 1;
console.log(user1);
var getName = function (name) {
    console.log(name);
};
getName(true);
var user3 = {
    firstName: 'John',
    lastName: 'Smith',
    age: 14,
    city: 'London',
    address: 'Ivana Franka'
};
// import { previewProductBlock } from '../modules/productModule.js'
var checkLocalCart = function () {
    var localCart = localStorage.getItem('cart');
    if (localCart) {
        var cart = JSON.parse(localCart);
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
var toggleMenu = function () {
    var toggleButtons = document.querySelectorAll('.header__action-menu');
    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var menu = document.querySelector('.header__menu-wrapper');
            menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hidden');
        });
    });
};
toggleMenu();
var cartButtons = document.querySelectorAll('.header__action-cart');
cartButtons.forEach(function (cartButton) {
    cartButton.addEventListener('click', function () {
        var cartWrapper = document.querySelector('.header__cart-wrapper');
        var cart = document.querySelector('.header__cart');
        var localCart = checkLocalCart();
        if (!localCart) {
            if (cartWrapper) {
                cartWrapper === null || cartWrapper === void 0 ? void 0 : cartWrapper.classList.add('empty');
                cartWrapper.textContent = 'Корзина пустая';
            }
        }
        else {
            var cartAmount = document.querySelector('.header__cart-amount');
            var cartPrice_1 = document.querySelector('.header__cart-price');
            var totalPrice_1 = 0;
            localCart.cart.forEach(function (item) {
                totalPrice_1 += +item.price;
                if (cartPrice_1) {
                    cartPrice_1.textContent = "".concat(totalPrice_1, " \u20B4");
                    cart === null || cart === void 0 ? void 0 : cart.append(previewProductBlock(item));
                }
            });
            if (cartAmount) {
                if (localCart.index <= 4) {
                    cartAmount.textContent = "".concat(localCart.index, " \u0442\u043E\u0432\u0430\u0440\u0430");
                }
                else if (localCart.index >= 5) {
                    cartAmount.textContent = "".concat(localCart.index, " \u0442\u043E\u0432\u0430\u0440\u043E\u0432");
                }
            }
        }
        cartWrapper === null || cartWrapper === void 0 ? void 0 : cartWrapper.classList.toggle('hidden');
    });
});
