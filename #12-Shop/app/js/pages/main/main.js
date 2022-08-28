const toggleMenu = () => {
    const toggleButtons = document.querySelectorAll('.header__action-menu');

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const menu = document.querySelector('.header__menu-wrapper');
            menu.classList.toggle('hidden');
        })
    })
}

toggleMenu();

function CategoriesCard(index, name, arrayCards) {
    this.index = index;
    this.name = name;
    this.arrayCards = arrayCards;

    this.render = function() {
        const currentWrapper = document.querySelector('.categories-wrapper');
        currentWrapper.append(this.createTitle(this.index, this.name));
        currentWrapper.append(this.createCardWrapper(this.arrayCards))
    }

    this.createTitle = function(index, title) {
        const currentTitle = document.createElement('h2');
        currentTitle.classList.add('categories-title');
        const createTitleSpan = document.createElement('span');
        createTitleSpan.textContent = index;
        currentTitle.append(createTitleSpan);
        currentTitle.textContent = title;
        return currentTitle
    }

    this.createCardWrapper = function(array) {
        const currentCardWrapper = document.createElement('div');
        currentCardWrapper.classList.add('categories__card-wrapper');
        array.forEach((card) => {
            currentCardWrapper.append(this.createCard(card));
        })
        return currentCardWrapper
    }

    this.createCard = function(card) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('categories__card');
        cardWrapper.append(this.createImage(card.image, 'image'));
        cardWrapper.append(this.createImage(card.background, 'background'));
        cardWrapper.append(this.createCardTitle(card.title));
        return cardWrapper
    }

    this.createImage = function(image, type) {
        const currentCardBackground = document.createElement('img');
        currentCardBackground.classList.add(`categories__card-${type}`);
        currentCardBackground.src = image;
        return currentCardBackground
    }

    this.createCardTitle = function(title) {
        const currentTitle = document.createElement('h3');
        currentTitle.classList.add('categories__card-title');
        currentTitle.textContent = title;
        return currentTitle
    }
}

const NewsCard = function(newsCard) {
    this.title = newsCard.title;
    this.description = newsCard.description;
    this.image = newsCard.image;

    this.render = function (){
        const currentWrapper = document.querySelector('.news-swiper .swiper-wrapper');
        currentWrapper.append(this.createSwiperWrapper());
    }

    this.createSwiperWrapper = function() {
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-slide');
        swiperWrapper.append(this.createCard());
        return swiperWrapper;
    }

    this.createCard = function() {
        const newsCardWrapper = document.createElement('div');
        newsCardWrapper.classList.add('news__card');
        newsCardWrapper.append(this.createCardImage());
        newsCardWrapper.append(this.createCardBody());
        newsCardWrapper.append(this.createCardButton());
        return newsCardWrapper
    }
    this.createCardImage = function() {
        const currentImage = document.createElement('img');
        currentImage.classList.add('news__card-image');
        currentImage.src = this.image;
        return currentImage;
    }
    this.createCardBody = function() {
        const createBodyWrapper = document.createElement('div');
        createBodyWrapper.classList.add('news__card-body');
        createBodyWrapper.append(this.createCardTitle());
        createBodyWrapper.append(this.createCardDescription())
        return createBodyWrapper;
    }
    this.createCardTitle = function() {
        const currentTitle = document.createElement('h3');
        currentTitle.textContent = this.title;
        return currentTitle
    }
    this.createCardDescription = function() {
        const currentDescription = document.createElement('p');
        currentDescription.textContent = this.description;
        return currentDescription
    }
    this.createCardButton = function() {
        const currentButton = document.createElement('button');
        currentButton.classList.add('news__card-button');
        currentButton.textContent = 'READ';
        return currentButton
    }
}

const categoriesBlock = new CategoriesCard(
    1,
    'Категории',
    [
        {
            "image": "../images/categories/bike-1.png",
            "background": "../images/categories/background-1.png",
            "title": "OFFROAD SERIES"
        },
        {
            "image": "../images/categories/bike-2.png",
            "background": "../images/categories/background-2.png",
            "title": "ROAD SERIES"
        },
        {
            "image": "../images/categories/bike-3.png",
            "background": "../images/categories/background-3.png",
            "title": "STREET SERIES"
        }
    ]
);
const noveltiesBlock = new CategoriesCard(
    2,
    'Новинки',
    [
        {
            "image": "../images/categories/bike-1.png",
            "background": "../images/categories/background-1.png",
            "title": "OFFROAD SERIES"
        },
        {
            "image": "../images/categories/bike-3.png",
            "background": "../images/categories/background-3.png",
            "title": "STREET SERIES"
        }
    ]
);

function ProductCard(product) {
    this.title = product.title;
    this.price = product.price;
    this.description1 = product.description1;
    this.description2 = product.description2;
    this.colors = product.colors;
    this.images = product.images;

    this.render = function() {

    }

    this.createProductAbout = function () {
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

    this.createProductTitle = function() {
        const productTitle = document.createElement('h2');
        productTitle.classList.add('category__product-title');
        productTitle.textContent = this.title;
        return productTitle
    }

    this.createProductPrice = function() {
        const productPrice = document.createElement('h4');
        productPrice.classList.add('category__product-price');
        productPrice.textContent = `${this.price} $`;
        return productPrice;
    }

    this.createProductDescription = function() {
        const descriptionWrapper = document.createElement('p');
        descriptionWrapper.classList.add('category__product-description');
        const description1 = document.createElement('span')
        description1.textContent = this.description1;
        const description2 = document.createElement('p')
        description2.textContent = this.description2;
        descriptionWrapper.append(
            description1,
            description2
        )
        return descriptionWrapper
    }

    this.createProductColors = function() {
        const colorWrapper = document.createElement('div');
        colorWrapper.classList.add('category__color-wrapper');
        const colorTitle = document.createElement('h2');
        colorTitle.textContent = 'Available colors:';
        const colorList = document.createElement('div');
        this.colors.forEach(color => {
            colorList.append(this.createProductColorButton(color));
        })
        colorWrapper.append(
            colorTitle,
            colorList
        )
        return colorWrapper
    }

    this.createProductColorButton = function(color) {
        const currentColor = document.createElement('button');
        currentColor.classList.add('category__color-item');
        currentColor.classList.add(color)
        return currentColor
    }

    this.createProductButton = function() {
        const currentButton = document.createElement('button');
        currentButton.classList.add('category__product-button');
        currentButton.textContent = 'MORE INFO';
        return currentButton
    }
}

const newsArray = [
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-1.png"
    },
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-2.png"
    },
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-3.png"
    },
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-2.png"
    },
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-1.png"
    },
    {
        "title": "Lorem ipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "image": "../images/news/image-3.png"
    }
]

newsArray.forEach((news) => {
    const currentNews = new NewsCard(news);
    currentNews.render();
})
categoriesBlock.render()
noveltiesBlock.render()
