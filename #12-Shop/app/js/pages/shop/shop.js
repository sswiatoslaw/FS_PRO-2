import { ProductCard, Data } from '../main/classes.js'

const data = new Data();

const productPromise = new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search).get('category');
    let currentProductArray;
    if(urlParams !== null) {
        currentProductArray = data.productData[urlParams];
        if(!currentProductArray) {
            reject(Error('Такої категорії не існує'));
        }
    } else {
        currentProductArray = [];
        for(let item in data.productData) {
            data.productData[item].forEach((product) => {
                currentProductArray.push(product);
            })
        }
    }
    resolve(currentProductArray);
})

productPromise.then((value) => {
    value.forEach((product) => {
    const currentProduct = new ProductCard(product);
    })
})
