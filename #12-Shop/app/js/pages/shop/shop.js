import { Card } from '../main/classes.js'

class ProductCard extends Card {
    constructor(properties) {
        super(properties);
        this.id = properties.id;
        this.price = properties.price;
        this.description1 = properties.description1;
        this.description2 = properties.description2;

        this.render(
            '.category__product-wrapper',
            [this.createProductItem()]
        )
    }
    createProductItem() {
        const currentProductItem = document.createElement('div');
        currentProductItem.classList.add('category__product-item');
        currentProductItem.append(this.createProductAbout(), this.createProductImages());
        return currentProductItem
    }

    createProductImages() {
        const productImagesWrapper = document.createElement('div');
        productImagesWrapper.classList.add('categories__product-images');
        const swiper = document.createElement('div');
        swiper.className = 'swiper product-swiper';
        const swiperWrapper = document.createElement('div');
        swiperWrapper.className = 'swiper-wrapper';
        const swiperButtonNext = document.createElement('div');
        swiperButtonNext.className = 'swiper-button-next';
        const swiperButtonPrev = document.createElement('div');
        swiperButtonPrev.className = 'swiper-button-prev';
        const swiperPagination = document.createElement('div');
        swiperPagination.className = 'swiper-pagination';
        swiper.append(
            swiperWrapper,
            swiperButtonNext,
            swiperButtonPrev,
            swiperPagination
        );
        productImagesWrapper.append(swiper);
        this.data.images.forEach((image) => {
            swiperWrapper.append(this.createProductImage(image));
        })
        return productImagesWrapper
    }

    createProductAbout() {
        const productAbout = document.createElement('div');
        productAbout.classList.add('category__product-about')
        productAbout.append(
            this.createProductTitle(),
            this.createProductPrice(),
            this.createProductDescription(),
            this.createProductColors(),
            this.createProductButton()
        )
        return productAbout
    }

    createProductTitle() {
        const productTitle = document.createElement('h2');
        productTitle.classList.add('category__product-title');
        productTitle.textContent = this.name;
        return productTitle
    }

    createProductPrice() {
        const productPrice = document.createElement('h4');
        productPrice.classList.add('category__product-price');
        productPrice.textContent = `${this.price} $`;
        return productPrice;
    }

    createProductDescription() {
        const descriptionWrapper = document.createElement('p');
        descriptionWrapper.classList.add('category__product-description');
        const description1 = document.createElement('span')
        description1.textContent = this.description1;
        const description2 = document.createElement('span')
        description2.textContent = this.description2;
        descriptionWrapper.append(
            description1,
            description2
        )
        return descriptionWrapper
    }

    createProductColors() {
        const colorWrapper = document.createElement('div');
        colorWrapper.classList.add('category__color-wrapper');
        const colorTitle = document.createElement('h2');
        colorTitle.textContent = 'Available colors:';
        const colorList = document.createElement('div');
        this.data.colors.forEach(color => {
            colorList.append(this.createProductColorButton(color));
        })
        colorWrapper.append(
            colorTitle,
            colorList
        )
        return colorWrapper
    }

    createProductColorButton(color) {
        const currentColor = document.createElement('button');
        currentColor.classList.add('category__color-item');
        currentColor.classList.add(color)
        return currentColor
    }

    createProductButton() {
        const currentButton = document.createElement('button');
        currentButton.classList.add('category__product-button');
        currentButton.innerHTML = `<a href="/product.html?id=${this.id}">MORE INFO</a>`;
        return currentButton
    }

    createProductImage(image) {
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-slide');
        const currentImage = document.createElement('img');
        currentImage.src = image;
        swiperWrapper.append(currentImage);
        return swiperWrapper
    }
}

const productArray = [
    {
        "name": "STREETSTER NATHAN",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "data": {
            "colors": ["black", "blue", "red"],
            "images": [
                "../images/shop/bike.png",
                "../images/shop/bike.png",
                "../images/shop/bike.png",
                "../images/shop/bike.png"
            ]
        }
    },
    {
        "name": "STREETSTER BAKERSTREET",
        "price": 550,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "data": {
            "colors": ["blue", "white"],
            "images": [
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png"
            ]
        }
    },
    {
        "name": "STREETSTER BROADWAY",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "data": {
            "colors": ["red", "orange"],
            "images": [
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png"
            ]
        }
    }
]

productArray.forEach((product, id) => {
    const currentProduct = new ProductCard({...product, id: id});
})
