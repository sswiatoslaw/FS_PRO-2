const blogArray = [
    {
        title: 'Take Care of your Plant',
        date: 'Aug 30, 2022',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus felis vul putate nec cursus pharetra, faucibus sapien nullam. Vel varius leo augue adipiscing ullamcorper eu. Vitae nisl pretium volutpat.',
        image: './images/blog-1.png'
    },
    {
        title: 'Take Care of your Plant',
        date: 'Aug 30, 2022',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus felis vul putate nec cursus pharetra, faucibus sapien nullam. Vel varius leo augue adipiscing ullamcorper eu. Vitae nisl pretium volutpat.',
        image: './images/blog-1.png'
    },
]

const blogArrayAll = [
    {
        title: 'How to Manage a Home Garden',
        date: 'Aug 30, 2022',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus felis vul putate nec cursus pharetra, faucibus sapien nullam. Vel varius leo augue adipiscing ullamcorper eu. Vitae nisl pretium volutpat.',
        image: './images/blog-2.png'
    },
    {
        title: 'How to Manage a Home Garden',
        date: 'Aug 30, 2022',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus felis vul putate nec cursus pharetra, faucibus sapien nullam. Vel varius leo augue adipiscing ullamcorper eu. Vitae nisl pretium volutpat.',
        image: './images/blog-2.png'
    },
]

const createCard = (blog) => {
    const blogCard = document.createElement('div');
    blogCard.className = 'blog__card';
    const imgCard = document.createElement('img');
    imgCard.src = blog.image;
    const dateCard = document.createElement('span');
    dateCard.textContent = blog.date;
    const titleCard = document.createElement('h3');
    titleCard.textContent = blog.title;
    const descriptionCard = document.createElement('p');
    descriptionCard.textContent = blog.description;
    const readMoreCard = document.createElement('a');
    readMoreCard.textContent = 'Read more...'
    blogCard.append(imgCard);
    blogCard.append(dateCard);
    blogCard.append(titleCard);
    blogCard.append(descriptionCard);
    blogCard.append(readMoreCard);
    return blogCard
}
const blogWrapper = document.querySelector('.blog__wrapper');
const sectionButton = document.querySelector('.section__button');
const appendCardToBlog = (array) => {
    array.forEach((element) => {
        blogWrapper.append(createCard(element));
    })
}
appendCardToBlog(blogArray);
sectionButton.addEventListener('click', () => {
    sectionButton.className = 'hidden';
    appendCardToBlog(blogArrayAll);
})

const swiper = new Swiper(".clients__slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
