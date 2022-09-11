import {Card} from "../main/classes.js";

const productArray = [
    {
        "name": "STREETSTER NATHAN",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "data": {
            "colors": ["black", "blue", "red"],
            "images": [
                "../images/shop/bike.png",
                "../images/shop/bike.png",
                "../images/shop/bike.png",
                "../images/shop/bike.png"
            ],
            "base": [
                {
                    'details': '(Height 5\'9-6\'0)',
                    "size": '54”'
                },
                {
                    'details': '(Height 6\'0-6\'4)',
                    "size": '57”'
                }
            ]
        }
    },
    {
        "name": "STREETSTER BAKERSTREET",
        "price": 550,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "data": {
            "colors": ["blue", "white"],
            "images": [
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png",
                "../images/shop/bike-2.png"
            ],
            "base": [
                {
                    'details': '(Height 5\'9-6\'0)',
                    "size": '54”'
                },
                {
                    'details': '(Height 6\'0-6\'4)',
                    "size": '57”'
                }
            ]
        }
    },
    {
        "name": "STREETSTER BROADWAY",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "data": {
            "colors": ["red", "orange"],
            "images": [
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png",
                "../images/shop/bike-3.png"
            ],
            "base": [
                {
                    'details': '(Height 5\'9-6\'0)',
                    "size": '54”'
                },
                {
                    'details': '(Height 6\'0-6\'4)',
                    "size": '57”'
                }
            ]
        }
    }
]
const urlParams = new URLSearchParams(window.location.search);

class CurrentProduct extends Card {
    constructor(properties) {
        super(properties);
        this.id = properties.id;
        this.price = properties.price;
        this.data = properties.data;
        this.description = properties.description;

        this.render('.product__image', [this.renderSwiper()])
        this.render('.product__actions', [
            this.createTitleProduct(),
            this.createProductPrice(),
            this.createProductColors(),
            this.createProductBase(),
            this.createTotalButton()
        ])
        this.render('.product__info', [
            this.createProductDescription()
        ])
    }

    createSwiper(image) {
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-slide');
        const currentImage = document.createElement('img');
        currentImage.src = image;
        swiperWrapper.append(currentImage);
        return swiperWrapper
    }

    renderSwiper() {
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
        productArray[this.id].data.images.forEach((image) => {
            swiperWrapper.append(this.createSwiper(image));
        })
        return swiper
    }

    createTitleProduct() {
        const currentTitle = document.createElement('h2');
        currentTitle.classList.add('product-title');
        currentTitle.textContent = this.name;
        return currentTitle
    }

    createProductPrice() {
        const productPrice = document.createElement('h4');
        productPrice.classList.add('product-price');
        productPrice.textContent = `${this.price} $`;
        return productPrice;
    }

    createProductColors() {
        const colorWrapper = document.createElement('div');
        colorWrapper.classList.add('product__color-wrapper');
        const colorTitle = document.createElement('h2');
        colorTitle.classList.add('product__color-title');
        colorTitle.textContent = 'Color: ';
        const colorTitleText = document.createElement('span');
        colorTitle.append(colorTitleText);
        const colorList = document.createElement('div');
        this.data.colors.forEach(color => {
            const currentButtonColor = this.createProductColorButton(color);
            currentButtonColor.addEventListener('click', () => {
                colorTitleText.textContent = color;
            });
            colorList.append(currentButtonColor);
        })
        colorWrapper.append(
            colorTitle,
            colorList
        )
        return colorWrapper
    }

    createProductColorButton(color) {
        const currentColor = document.createElement('button');
        currentColor.classList.add('product__color-item');
        currentColor.classList.add(color)
        return currentColor
    }

    createProductBase() {
        const baseWrapper = document.createElement('div');
        baseWrapper.classList.add('product__base-wrapper');
        const baseTitle = document.createElement('h2');
        baseTitle.classList.add('product__base-title');
        baseTitle.textContent = 'Base: ';
        const baseTitleText = document.createElement('span');
        baseTitle.append(baseTitleText);
        const baseList = document.createElement('div');
        baseList.classList.add('product__base-button-wrapper')
        this.data.base.forEach(base => {
            const currentBaseButton = this.createProductBaseButton(base.size);
            currentBaseButton.addEventListener('click', () => {
                baseTitleText.textContent = `${base.size} ${base.details}`
                const arrayBaseButton = document.querySelectorAll('.product__base-button');
                arrayBaseButton.forEach(currentButton => {
                    currentButton.classList.remove('active');
                })
                currentBaseButton.classList.add('active');
            })
            baseList.append(currentBaseButton);
        })
        baseWrapper.append(
            baseTitle,
            baseList
        )
        return baseWrapper
    }

    createProductBaseButton(text) {
        const currentBaseButton = document.createElement('button');
        currentBaseButton.classList.add('product__base-button');
        currentBaseButton.textContent = text;
        const checkButton = document.createElement('div');
        checkButton.classList.add('product__base-button-check');
        currentBaseButton.prepend(checkButton);
        return currentBaseButton
    }

    createTotalButton() {
        const totalWrapper = document.createElement('div');
        totalWrapper.classList.add('product__total-wrapper');
        const priceWrapper = document.createElement('div');
        priceWrapper.classList.add('product__price-wrapper');
        const totalTitle = document.createElement('h2');
        totalTitle.classList.add('product__price-title');
        totalTitle.textContent = 'Total: ';
        const totalPrice = document.createElement('h4');
        totalPrice.classList.add('product__price-price');
        totalPrice.textContent = `${this.price} $`;
        const totalButton = document.createElement('button');
        totalButton.classList.add('product__total-button');
        totalButton.textContent = 'ADD TO CART';
        priceWrapper.append(
            totalTitle,
            totalPrice
        );

        totalWrapper.append(
            priceWrapper,
            totalButton
        )
        return totalWrapper
    }

    createProductDescription() {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('product__info-description');
        const descriptionTitle = document.createElement('h2');
        descriptionTitle.textContent = 'Description';
        const description = document.createElement('p');
        description.classList.add('category__product-description');
        description.textContent = this.description;

        descriptionWrapper.append(
            descriptionTitle,
            description
        )

        return descriptionWrapper
    }
}

const currentProduct = new CurrentProduct({
    ...productArray[urlParams.get('id')],
    id: urlParams.get('id')
})

console.log(currentProduct);

