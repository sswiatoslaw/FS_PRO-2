// import { previewProductBlock } from '../modules/productModule.js'

type cartItem = {
    [key: string]: any;
}

interface Cart {
    availiable: boolean;
    cart: cartItem,
    index: number
} 


const checkLocalCart = (): Cart | null => {
    const localCart: string | null = localStorage.getItem('cart');
    if(localCart) {
        const cart = JSON.parse(localCart);
        return {
            availiable: !!cart,
            cart: cart,
            index: cart.length
        }
    } else {
        return null
    }
}

const toggleMenu = (): void => {
    const toggleButtons = document.querySelectorAll('.header__action-menu');
    toggleButtons.forEach((button: Element) => {
        button.addEventListener('click', () => {
            const menu = document.querySelector('.header__menu-wrapper');
            menu?.classList.toggle('hidden');
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
            if(cartWrapper) {
                cartWrapper?.classList.add('empty');
                cartWrapper.textContent = 'Корзина пустая'
            }
        } else {
            const cartAmount = document.querySelector('.header__cart-amount');
            const cartPrice = document.querySelector('.header__cart-price');
            let totalPrice = 0;
            localCart.cart.forEach((item) => {
                totalPrice += +item.price;
                if(cartPrice) {
                    cartPrice.textContent = `${totalPrice} ₴`;
                    // cart?.append(previewProductBlock(item));
                }
            })

            if(cartAmount){
                if(localCart.index <= 4) {
                    cartAmount.textContent = `${localCart.index} товара`
                } else if (localCart.index >= 5) {
                    cartAmount.textContent = `${localCart.index} товаров`
                }
            }
        }
        cartWrapper?.classList.toggle('hidden');
    })
})
