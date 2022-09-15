import {CategoriesCard, NewsCard} from "./classes.js";

const categoriesBlock = new CategoriesCard({
    index: "1",
    name: 'Категории',
    data: [
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
});

const noveltiesBlock = new CategoriesCard({
    index: "2",
    name: 'Новинки',
    data: [
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
});

const newsPromise = new Promise((resolve, reject) => {
    const newsArray = [
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-1.png"
        },
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-2.png"
        },
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-3.png"
        },
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-2.png"
        },
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-1.png"
        },
        {
            "name": "Lorem ipsum",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
            "image": "../images/news/image-3.png"
        }
    ]

    if(newsArray) {
        resolve(newsArray)
    }
})

newsPromise.then(value => {
    value.forEach((news) => {
        const currentNews = new NewsCard(news);
    })
})

