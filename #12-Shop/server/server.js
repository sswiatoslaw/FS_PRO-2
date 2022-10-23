const express = require('express');
const cors = require('cors');
const data = require('./data.json');
const fs = require('fs');
const path = require('path');

// import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

const filterProducts = (products, queryParams, queryName) => {
    if(queryParams[queryName]) {
        return products.filter((product) => {
            return product[queryName] === queryParams[queryName];
        })
    } else {
        return products
    }
}

app.get('/products', (req, res) => {
    const queryParams = req.query;
    if(queryParams) {
        let filteredProducts = data.products;
            filteredProducts = filterProducts(filterProducts, queryParams, 'category');
            filteredProducts = filterProducts(filterProducts, queryParams, 'min');
            filteredProducts = filterProducts(filterProducts, queryParams, 'max');
            res.json(filteredProducts);
    } else {
        res.json(data.products);
    }
})

const findProduct = (file, id) => {
    return file.products.find((product, index) => {
        if(product.id == id) {
            { product, index }
        }
    })
}

app.get('/products/:id', (req, res) => {
    const currentParams = req.params;
    const currentProduct = findProduct(data, currentParams.id).product;

    if(currentProduct) {
        res.json(currentProduct)
    } else {
        res.status(400).send('Product with id ' + currentParams.id + ' not found.')
    }
})

app.get('/products/:id/amount', (req, res) => {
    const currentParams = req.params;
    const currentProduct = findProduct(data, currentParams.id).product;

    if(currentProduct) {
        res.json(currentProduct.amount)
    } else {
        res.status(400).send('Product with id ' + currentParams.id + ' not found.')
    }
})

app.get('/news', (req, res) => {
    res.json(data.news);
})

app.get('/news/:id', (req, res) => {
    const currentParams = req.params;
    console.log(data.news);
    const currentNews = data.news.find((news) => {
        return news.id == currentParams.id;
    })

    if(currentNews) {
        res.json(currentNews);
    } else {
        res.status(400).send(`News with id ${currentParams.id} not found`);
    }
})

app.post('/cart/add', (req, res) => {
    try {
        // req.body = object (personalData, address, products)
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'); 
        const parsedData = JSON.parse(data);
        parsedData.cart.push(req.body);
        req.body.products.forEach(element => {
            const currentProduct = findProduct(parsedData, element.id);
            console.log(parsedData.product[currentProduct.index]);
            parsedData.product[currentProduct.index].amount--;
            console.log(parsedData.product[currentProduct.index]);
        });
        console.log(parsedData.cart);
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(parsedData), (error) => {
            console.log(error);
        })
    
    } catch(err) {
        console.log(err);
    }    
})

const startServer = (port) => {
    console.log('Server started port ' + port);
    app.listen(port);
}
startServer(4800);