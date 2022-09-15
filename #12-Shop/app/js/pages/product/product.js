import {CurrentProduct, Data} from "../main/classes.js";

const data = new Data();

const currentProductPromise = new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    let currentProduct;

    for(let item in data.productData) {
        currentProduct = data.productData[item].find((product) => {
            return product.id === urlParams.get('id')
        })
    }

    if(currentProduct){
        resolve(currentProduct)
    } else {
        reject(Error('Product not found'));
    }
})

currentProductPromise.then((value) => {
    const currentProduct = new CurrentProduct(value);
})

