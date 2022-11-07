type cartItem = {
    name: string;
    id: number;
    amount: number;
    price: number;
    image: string;
    color?: string;
    base?: string;
    category?: string;
    description1?: string;
    description2?: string;
}

interface Cart {
    availiable: boolean;
    cart: cartItem[],
    index: number
} 

export {cartItem, Cart}

// {
//     "id": "4",
//     "amount": 11,
//     "category": "street",
//     "name": "STREETSTER BAKERSTREET",
//     "price": 700,
//     "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     "color": "blue",
//     "base": "57”"
// }

// {
//     "name": "Octane Helmet",
//     "price": 50,
//     "isAddedToCart": true,
//     "image": "../images/accessories/bicycle_helmet_PNG9823.png"
// }