import {ProductCard, Server} from '../main/classes.js'

const urlParams = new URLSearchParams(window.location.search);
const server = new Server();

server.request(`products?category=${urlParams.get('category')}`).then((value) => {
    value.forEach((product) => {
    const currentProduct = new ProductCard(product);
    })
})
