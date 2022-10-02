export class Server {
    cart = [];
    constructor() {
        this.serverUrl = "http://localhost:4800/";
    }

    request = (url) => {
        return fetch(`${this.serverUrl}${url}`).then((response) => response.json())
    }

    requestCart = (item) => {
        const cartIndex = document.querySelector('.header__action-cartIndex');
        this.cart.push(item);
        cartIndex.textContent = this.cart.length;
        cartIndex.classList.remove('hidden');
    }

    requestDeleteItemCart = (item) => {
        this.cart = this.cart.filter(currentItem => currentItem !== item);
    }

    requestPost = (url, body) => {
        return fetch(`${this.serverUrl}${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: body
        }).then(value => {
            return value.json();
        })
    }
}


const server = new Server();

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
    currentBase = undefined;
    currentColor = undefined;

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
    cart = [];
    constructor(properties) {
        super(properties);
        this.id = properties.id;
        this.price = properties.price;
        this.data = properties.data;
        this.description = properties.description1 + properties.description2;
        this.comments = properties.comments;
        this.currentProduct = properties;

        this.render('.product__image', [this.renderSwiper()])
        this.render('.product__actions', [
            this.createTitleProduct(),
            this.createProductPrice(),
            this.createProductColors(),
            this.createProductBase(),
            this.createProductAccessories(),
            this.createTotalButton()
        ])
        this.render('.product__details-wrapper', [
            this.createDetailsDescription(),
            this.createDetailsReviews()
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
                this.currentColor = color;
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
                this.currentBase = base.size;
                console.log(this.currentBase);
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

    createProductAccessories() {
        const accessoriesWrapper = document.createElement("div");
        accessoriesWrapper.classList.add('product__accessories-wrapper');

        const accessoriesItemWrapper = document.createElement("div");
        accessoriesItemWrapper.classList.add('product__accessories-item-wrapper');

        const accessoriesTitle = document.createElement('h2');
        accessoriesTitle.classList.add('product__accessories-title');
        accessoriesTitle.textContent = 'Additional accessories: ';

        this.data.accessories.forEach((element) => {
            accessoriesItemWrapper.append(this.createProductAccessoriesItem(element));
        });

        accessoriesWrapper.append(accessoriesTitle, accessoriesItemWrapper);


        return accessoriesWrapper
    }

    createProductAccessoriesItem(item) {
        const accessoriesItemWrapper = document.createElement("div");
        accessoriesItemWrapper.classList.add('product__accessories-item');

        const accessoriesItemImage = document.createElement('img');
        accessoriesItemImage.classList.add("product__accessories-image");
        accessoriesItemImage.src = item.image;

        const accessoriesItemName = document.createElement("h2");
        accessoriesItemName.classList.add('product__accessories-name');
        accessoriesItemName.textContent = item.name;

        const accessoriesItemPrice = document.createElement('h4');
        accessoriesItemPrice.classList.add('product__accessories-price');
        accessoriesItemPrice.textContent = `${item.price} $`;

        const accessoriesItemButton = document.createElement('button');
        accessoriesItemButton.classList.add("product__accessories-button");

        accessoriesItemButton.addEventListener('click', (event) => {
            item.isAddedToCart = !item.isAddedToCart;
            if(item.isAddedToCart) {
                this.cart.push(item);
                server.requestCart(item);
                this.editTotalPrice(this.getTotalPrice() + item.price);
            } else {
                this.cart = this.cart.filter(currentItem => currentItem !== item);
                this.editTotalPrice(this.getTotalPrice() - item.price);
            }
            event.target.classList.toggle("added");
        })
        accessoriesItemWrapper.append(
            accessoriesItemImage,
            accessoriesItemName,
            accessoriesItemPrice,
            accessoriesItemButton
        )
        return accessoriesItemWrapper
    }

    getTotalPrice() {
        const totalPrice = document.querySelector('.product__price-price');
        return +totalPrice.textContent.split(' ')[0]
    }


    editTotalPrice(price) {
        console.log(price)
        const totalPrice = document.querySelector('.product__price-price');
        totalPrice.textContent = `${price} $`;
    }

    showError(error) {
        const message = document.querySelector('.message');
        message.textContent = error;
        message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('hidden');
        }, 5000)
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
        totalButton.addEventListener('click', () => {
            if(!this.currentColor || !this.currentBase) {
                this.showError('Виберіть обовʼязкові параметри!!');
            } else {
                this.currentProduct.color = this.currentColor;
                this.currentProduct.base = this.currentBase;
                delete this.currentProduct.data;
                delete this.currentProduct.comments;
                this.cart.push(this.currentProduct);
                console.log(this.cart);
            }
        })
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

    createDetailsDescription() {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('product__details-description');

        const descriptionTitle = document.createElement('h2');
        descriptionTitle.classList.add('product__details-title');
        descriptionTitle.textContent = 'Description';
        const description = document.createElement('p');
        description.classList.add('category__product-description');
        description.textContent = this.description;

        descriptionWrapper.append(descriptionTitle, description);

        return descriptionWrapper
    }

    createDetailsReviews() {
        const reviewsWrapper = document.createElement('div');
        reviewsWrapper.classList.add('product__reviews-wrapper');

        const reviewsTitle = document.createElement('h2');
        reviewsTitle.classList.add('product__details-title');
        reviewsTitle.textContent = "Reviews";

        reviewsWrapper.append(reviewsTitle);

        this.comments.forEach(comment => {
            reviewsWrapper.append(this.createDetailsReviewsItem(comment));
        })

        return reviewsWrapper
    }

    createDetailsReviewsItem(item) {
        const reviewsItemWrapper = document.createElement('div');
        reviewsItemWrapper.classList.add('product__reviews-item');

        const reviewsItemName = document.createElement('h2');
        reviewsItemName.classList.add('product__reviews-name');
        reviewsItemName.textContent = item.name;

        const reviewsItemText = document.createElement('p');
        reviewsItemText.classList.add('product__reviews-text');
        reviewsItemText.textContent = item.text;

        reviewsItemWrapper.append(reviewsItemName, reviewsItemText);

        return reviewsItemWrapper
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
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
                        ],
                        "accessories": [
                            {
                                "name": "Octane Helmet",
                                "price": 50,
                                "image": "../images/accessories/bicycle_helmet_PNG9823.png"
                            },
                            {
                                "name": "Canyon Shield",
                                "price": 100,
                                "image": "../images/accessories/168324_Canyon_Ass_Saver_black.png"
                            }
                        ]
                    },
                    "comments": [
                        {
                            "name": "Josh B.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        },
                        {
                            "name": "Andrew Y.",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                        }
                    ]
                }
            ]
        }
    }

}
