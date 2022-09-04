const productArray = [
    {
        "title": "STREETSTER NATHAN",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "colors": ["black", "blue", "red"],
        "images": [
            "../images/shop/bike.png",
            "../images/shop/bike.png",
            "../images/shop/bike.png",
            "../images/shop/bike.png"
        ]
    },
    {
        "title": "STREETSTER BAKERSTREET",
        "price": 550,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "colors": ["blue", "white"],
        "images": [
            "../images/shop/bike-2.png",
            "../images/shop/bike-2.png",
            "../images/shop/bike-2.png",
            "../images/shop/bike-2.png"
        ]
    },
    {
        "title": "STREETSTER BROADWAY",
        "price": 500,
        "description1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "description2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "colors": ["red", "orange"],
        "images": [
            "../images/shop/bike-3.png",
            "../images/shop/bike-3.png",
            "../images/shop/bike-3.png",
            "../images/shop/bike-3.png"
        ]
    }
]
const urlParams = new URLSearchParams(window.location.search);

const createSwiper = (image) => {
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-slide');
    const currentImage = document.createElement('img');
    currentImage.src = image;
    swiperWrapper.append(currentImage);
    return swiperWrapper
}

const renderSwiper = () => {
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
    const id = urlParams.get('id');
    productArray[id].images.forEach((image) => {
        swiperWrapper.append(createSwiper(image));
    })
    return swiper
}

const productInfoWrapper = document.querySelector('.product__info');
productInfoWrapper.append(renderSwiper());

