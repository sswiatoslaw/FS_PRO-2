import {ProductCard, Server} from '../main/classes.js'

const urlParams = new URLSearchParams(window.location.search);
const server = new Server();

if(urlParams.get('category')) {
    server.request(`products?category=${urlParams.get('category')}`).then((value) => {
        value.forEach((product) => {
        const currentProduct = new ProductCard(product);
        })
    })
} else {
    server.request('products').then((value) => {
        value.forEach((product) => {
        const currentProduct = new ProductCard(product);
        })
    }).catch(error => {
        console.log(error);
    })
    
}
