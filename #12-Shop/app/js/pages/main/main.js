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

function Card() {
}
Card.prototype.render = function (currentClass, currentElements) {
    const currentWrapper = document.querySelector(currentClass);
    currentElements.forEach(currentElement => {
        currentWrapper.append(currentElement);
    })
}

function CategoriesCard(index, name, arrayCards) {
    Card.call(this);

    this.index = index;
    this.name = name;
    this.arrayCards = arrayCards;

    this.createTitle = function() {
        const currentTitle = document.createElement('h2');
        currentTitle.classList.add('categories-title');
        const createTitleSpan = document.createElement('span');
        createTitleSpan.textContent = this.index;
        currentTitle.append(createTitleSpan);
        currentTitle.textContent = this.name;
        return currentTitle
    }

    this.createCardWrapper = function() {
        const currentCardWrapper = document.createElement('div');
        currentCardWrapper.classList.add('categories__card-wrapper');
        this.arrayCards.forEach((card) => {
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

CategoriesCard.prototype = Object.create(Card.prototype);

const NewsCard = function(newsCard) {
    Card.call(this);
    this.title = newsCard.title;
    this.description = newsCard.description;
    this.image = newsCard.image;

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

NewsCard.prototype = Object.create(Card.prototype);

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
    currentNews.render('.news-swiper .swiper-wrapper', [currentNews.createSwiperWrapper()]);
})
categoriesBlock.render('.categories-wrapper', [categoriesBlock.createTitle(), categoriesBlock.createCardWrapper()])
noveltiesBlock.render('.categories-wrapper', [noveltiesBlock.createTitle(), noveltiesBlock.createCardWrapper()])
