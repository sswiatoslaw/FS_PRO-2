import {CurrentProduct, Server} from "../main/classes.js";

const urlParams = new URLSearchParams(window.location.search);
const server = new Server();

server.request(`products/${urlParams.get("id")}`).then((value) => {
    const currentProduct = new CurrentProduct(value);
})
