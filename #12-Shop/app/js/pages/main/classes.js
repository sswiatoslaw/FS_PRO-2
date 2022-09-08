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
        this.dataArray.forEach((card) => {
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
