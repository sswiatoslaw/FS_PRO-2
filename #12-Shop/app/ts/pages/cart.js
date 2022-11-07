import { createElement } from '../../js/modules/elementsModule.js';
import { Server } from "../../js/pages/main/classes.js";
const server = new Server();
const cartList = document.querySelector('.cart__item-list');
let cartLocal = localStorage.getItem('cart');
let cart;
if (cartLocal) {
    cart = JSON.parse(cartLocal);
    console.log(cart);
}
const changeAmountItem = (amount, id) => {
    cart.find((item, index) => {
        if (item.id == id) {
            // @ts-ignore
            console.log(cart[index].amount);
            // @ts-ignore
            cart[index].amount = amount;
            // @ts-ignore
            console.log(cart[index].amount);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
};
const createCartItem = (item) => {
    // @ts-ignore
    const itemWrapper = createElement({ tagName: 'div', classList: ['cart__item'] });
    const itemImage = createElement(
    // @ts-ignore
    {
        tagName: 'img',
        classList: ['cart__item-image'],
        attr: {
            'src': '../images/categories/bike-1.png'
        }
    });
    const itemDetails = createElement({ tagName: 'div', classList: ['cart__item-details'] });
    const itemDetailsTitle = createElement({ tagName: 'h3', data: item.name });
    itemDetails.append(itemDetailsTitle);
    if (item.color && item.base) {
        const itemDetailsSubtitle = createElement({
            tagName: 'p',
            data: `Цвет: ${item.color}, Рама: ${item.base}`
        });
        itemDetails.append(itemDetailsSubtitle);
    }
    const itemAmountWrapper = createElement({ tagName: 'div', classList: ["cart__item-amount"] });
    const itemAmountIncrease = createElement({ tagName: 'p', data: '+' });
    const itemAmountDecrease = createElement({ tagName: 'p', data: '-' });
    const itemAmountData = createElement({ tagName: 'span', data: String(item.amount) });
    itemAmountWrapper.append(itemAmountIncrease, itemAmountData, itemAmountDecrease);
    const itemPrice = createElement({ tagName: 'p', classList: ['cart__item-price'], data: `${item.price * Number(itemAmountData.textContent)} ₴` });
    itemAmountIncrease.addEventListener('click', (event) => {
        let itemAmount = Number(itemAmountData.textContent);
        let price = Number(item.price);
        itemAmount++;
        changeAmountItem(itemAmount, item.id);
        price = item.price * itemAmount;
        itemPrice.textContent = `${String(price)} ₴`;
        itemAmountData.textContent = String(itemAmount);
    });
    itemAmountDecrease.addEventListener('click', (event) => {
        let itemAmount = Number(itemAmountData.textContent);
        let price = Number(item.price);
        itemAmount--;
        changeAmountItem(itemAmount, item.id);
        price = item.price * itemAmount;
        itemPrice.textContent = `${String(price)} ₴`;
        itemAmountData.textContent = String(itemAmount);
    });
    itemWrapper.append(itemImage, itemDetails, itemAmountWrapper, itemPrice);
    return itemWrapper;
};
if (cartLocal) {
    const cart = JSON.parse(cartLocal);
    console.log(cart);
    cart.forEach((item) => {
        cartList === null || cartList === void 0 ? void 0 : cartList.append(createCartItem(item));
    });
}
const cartSubmit = document.querySelector('.cart__item-submit');
cartSubmit === null || cartSubmit === void 0 ? void 0 : cartSubmit.addEventListener('click', () => {
    const form = document.forms;
    let formObject = {};
    for (let i = 0; i < form.length; i++) {
        formObject[form[i].name] = {};
    }
    Object.keys(formObject).forEach(key => {
        Object.keys(form[key].elements).forEach(element => {
            if (!Number(element) && Number(element) !== 0) {
                formObject[key][element] = form[key].elements[element].value;
            }
        });
    });
    formObject['products'] = cart;
    console.log(formObject);
    server.requestPost('cart', formObject)
        .then((response) => {
        console.log(response);
        console.log('WORK', formObject);
        localStorage.removeItem('cart');
    })
        .catch((error) => {
        console.log(error);
    });
});
