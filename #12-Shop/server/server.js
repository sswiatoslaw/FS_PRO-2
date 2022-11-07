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
    if (queryParams[queryName]) {
        return products.filter((product) => {
            return product[queryName] === queryParams[queryName];
        })
    } else {
        return products
    }
}

app.get('/products', (req, res) => {
    const queryParams = req.query;
    if (queryParams) {
        let filteredProducts = data.products;
        filteredProducts = filterProducts(filteredProducts, queryParams, 'category');
        filteredProducts = filterProducts(filteredProducts, queryParams, 'min');
        filteredProducts = filterProducts(filteredProducts, queryParams, 'max');
        res.json(filteredProducts);
    } else {
        res.json(data.products);
    }
})

const findProduct = (file, id) => {
    return file.products.find((product, index) => {
        if (product.id == id) {
            return { ...product, ...index }
        }
    })
}

app.get('/products/:id', (req, res) => {
    const currentParams = req.params;
    const currentProduct = findProduct(data, currentParams.id);
    console.log(currentParams.id);

    if (currentProduct) {
        res.json(currentProduct)
    } else {
        res.status(400).send('Product with id ' + currentParams.id + ' not found.')
    }
})

app.get('/products/:id/amount', (req, res) => {
    const currentParams = req.params;
    const currentProduct = findProduct(data, currentParams.id).product;

    if (currentProduct) {
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

    if (currentNews) {
        res.json(currentNews);
    } else {
        res.status(400).send(`News with id ${currentParams.id} not found`);
    }
})

app.post('/cart', (req, res) => {
    req.body;
    res.json(req.body);
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), (error) => {
        console.log(error);
    });
    const parsedData = JSON.parse(data);
    let status = 200;
    if(req.body.products) {
        req.body.products.forEach(element => {
            const currentProduct = findProduct(parsedData, element.id);
            console.log('front amount = ', element.amount);
            console.log('data amount', currentProduct.amount);
            if (element.amount > currentProduct.amount) {
                status = 400;
                res.status('400').send({
                    id: element.id,
                    maxAmount: currentProduct.amount
                })
            } else {
                parsedData.products.find((product, index) => {
                    if (product.id == element.id) {
                        product.amount = currentProduct.amount - element.amount;
                    }
                })
                console.log('final amount', currentProduct.amount);
            }
        });
    }

    if (status === 200) {
        parsedData.cart.push(req.body);
        res.status(200);
    }

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(parsedData), (error) => {
        console.log(error);
    })
})

const startServer = (port) => {
    console.log('Server started port ' + port);
    app.listen(port);
}
startServer(4800);