const postsList = document.querySelector('.posts__list');
const instagramPostsList = document.querySelector('.instagram-posts__list');
const menuButton = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

const postsArray = [
    {
        image: './images/posts/img-1.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 9,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
        image: './images/posts/img-2.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 14,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
        image: './images/posts/img-3.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 2,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
        image: './images/posts/img-4.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 56,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
]

const instagramPostsArray = [
    {
        image: './images/instagram-posts/img-1.png'
    },
    {
        image: './images/instagram-posts/img-2.png'
    },
    {
        image: './images/instagram-posts/img-3.png'
    },
    {
        image: './images/instagram-posts/img-4.png'
    },
]

const createPost = (post) => {
    const postItem = document.createElement('div');
    postItem.className = 'posts__item';
    const postImage = document.createElement('img');
    postImage.src = post.image;
    const wrapperText = document.createElement('div');
    wrapperText.className = 'posts__text-wrapper';
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    const postDescription = document.createElement('p');
    postDescription.className = 'posts__item-description';
    postDescription.textContent = post.description;
    const postType = document.createElement('p');
    postType.textContent = post.type;
    const postComments = document.createElement('span');
    postComments.textContent = ' / ' + post.comments + ' Comments';

    wrapperText.append(postTitle);
    postType.append(postComments);
    wrapperText.append(postType);
    wrapperText.append(postDescription);

    postItem.append(postImage);
    postItem.append(wrapperText);

    return postItem;
}

const createInstagramPost = (post) => {
    const postImage = document.createElement('img');
    postImage.src = post.image;
    postImage.className = 'instagram-posts__item';

    return postImage;
}

const changeHeader = (widthScreen) => {
    if (widthScreen > 768) {
        menu.classList.remove('header__menu-mobile', 'hidden');
    } else {
        menu.classList.add('header__menu-mobile', 'hidden');
    }
}

const renderPosts = (widthScreen) => {
    postsList.textContent = '';
    instagramPostsList.textContent = '';
    if(widthScreen > 768) {
        for (let i = 0; i < 4; i++) {
            postsList.append(createPost(postsArray[i]));
        }
        for (let i = 0; i < 3; i++) {
            instagramPostsList.append(createInstagramPost(instagramPostsArray[i]));
        }
    } else {
        for (let i = 0; i < 3; i++) {
            postsList.append(createPost(postsArray[i]));
        }
        for (let i = 0; i < 1; i++) {
            instagramPostsList.append(createInstagramPost(instagramPostsArray[i]));
        }
    }

}

const mediaRequests = () => {
    const widthScreen = window.innerWidth;
    console.log(widthScreen)
    changeHeader(widthScreen);
    renderPosts(widthScreen);
}

onload = mediaRequests();

menuButton.addEventListener('click', (event) => {
    const defaultButton = '/images/menu-button.svg';
    if (event.target.src === location.origin + defaultButton) {
        event.target.src = './images/menu-button-close.svg';
    } else {
        event.target.src = '.' + defaultButton;
    }
    menu.classList.toggle('hidden');
})

window.addEventListener('resize', () => mediaRequests());

