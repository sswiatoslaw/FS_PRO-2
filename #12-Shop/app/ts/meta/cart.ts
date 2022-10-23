type cartItem = {
    [key: string]: any;
}

interface Cart {
    availiable: boolean;
    cart: cartItem,
    index: number
} 

export {cartItem, Cart}