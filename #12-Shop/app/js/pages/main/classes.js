export class Card{
    constructor(properties) {
        this.name = properties.name;
        this.data = properties.data;
    }

    render(currentClass, currentElements) {
        console.log(currentElements);
        const currentWrapper = document.querySelector(currentClass);
        currentElements.forEach(currentElement => {
            currentWrapper.append(currentElement);
        })
    }
}

export class CategoriesCard extends Card {
    constructor(properties) {
        super(properties);
        this.index = properties.index;
        this.render(
            '.categories-wrapper',
            [
                this.createTitle(),
                this.createCardWrapper()
            ]
        )
    }

    createTitle() {
        const currentTitle = document.createElement('h2');
        currentTitle.classList.add('categories-title');
        const createTitleSpan = document.createElement('span');
        createTitleSpan.textContent = this.index;
        currentTitle.append(createTitleSpan);
        currentTitle.textContent = this.name;
        return currentTitle
    }

    createCardWrapper() {
        const currentCardWrapper = document.createElement('div');
        currentCardWrapper.classList.add('categories__card-wrapper');
        this.data.forEach((card) => {
            currentCardWrapper.append(this.createCard(card));
        })
        return currentCardWrapper
    }

    createCard(card) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('categories__card');
        cardWrapper.append(this.createImage(card.image, 'image'));
        cardWrapper.append(this.createImage(card.background, 'background'));
        cardWrapper.append(this.createCardTitle(card.title));
        return cardWrapper
    }

    createImage(image, type) {
        const currentCardBackground = document.createElement('img');
        currentCardBackground.classList.add(`categories__card-${type}`);
        currentCardBackground.src = image;
        return currentCardBackground
    }

    createCardTitle(title) {
        const currentTitle = document.createElement('h3');
        currentTitle.classList.add('categories__card-title');
        currentTitle.textContent = title;
        return currentTitle
    }
}

export class NewsCard extends Card {
    constructor(properties) {
        super(properties);

        this.description = properties.description;
        this.image = properties.image;
        this.render(
            '.news-swiper .swiper-wrapper',
            [this.createSwiperWrapper()]
        );
    }

    createSwiperWrapper() {
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-slide');
        swiperWrapper.append(this.createCard());
        return swiperWrapper;
    }

    createCard() {
        const newsCardWrapper = document.createElement('div');
        newsCardWrapper.classList.add('news__card');
        newsCardWrapper.append(this.createCardImage());
        newsCardWrapper.append(this.createCardBody());
        newsCardWrapper.append(this.createCardButton());
        return newsCardWrapper
    }

    createCardImage() {
        const currentImage = document.createElement('img');
        currentImage.classList.add('news__card-image');
        currentImage.src = this.image;
        return currentImage;
    }

    createCardBody() {
        const createBodyWrapper = document.createElement('div');
        createBodyWrapper.classList.add('news__card-body');
        createBodyWrapper.append(this.createCardTitle());
        createBodyWrapper.append(this.createCardDescription())
        return createBodyWrapper;
    }

    createCardTitle() {
        const currentTitle = document.createElement('h3');
        currentTitle.textContent = this.name;
        return currentTitle
    }

    createCardDescription() {
        const currentDescription = document.createElement('p');
        currentDescription.textContent = this.description;
        return currentDescription
    }

    createCardButton() {
        const currentButton = document.createElement('button');
        currentButton.classList.add('news__card-button');
        currentButton.textContent = 'READ';
        return currentButton
    }
}

export class ProductCard extends Card {
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

export class CurrentProduct extends Card {
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
        this.data.images.forEach((image) => {
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


export class Data {
    constructor() {
        this.productData = {
            mountain: [
                {
                    "id": "1",
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
                    "id": "2",
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
                    "id": "3",
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
            ],
            street: [
                {
                    "id": "4",
                    "name": "STREETSTER BAKERSTREET",
                    "price": 700,
                    "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
                    "id": "5",
                    "name": "STREETSTER BROADWAY",
                    "price": 2000,
                    "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
            ],
            road: [
                {
                    "id": "6",
                    "name": "STREETSTER BROADWAY",
                    "price": 1500,
                    "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
        }
    }

}
