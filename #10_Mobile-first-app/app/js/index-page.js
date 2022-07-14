const postsList = document.querySelector('.posts__list');
const instagramPostsList = document.querySelector('.instagram-posts__list');

const postsArray = [
    {
        image: './images/posts/img-1.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 1,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
        commentsList: [
            {
                name: 'John Smith',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            }
        ]
    },
    {
        image: './images/posts/img-2.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 3,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
        commentsList: [
            {
                name: 'Test Name',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            },
            {
                name: 'Name',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            },
            {
                name: 'Kyiv',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            }
        ]
    },
    {
        image: './images/posts/img-3.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 1,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
        commentsList: [
            {
                name: 'Sviatoslav',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            }
        ]
    },
    {
        image: './images/posts/img-4.png',
        title: 'Aenean Adipiscing Etiam Vestibulum',
        type: 'Photography, Journal',
        comments: 1,
        description: 'Etiam porta sem malesuada euismod. Aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
        commentsList: [
            {
                name: 'DAN.IT Education',
                text: 'lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore'
            }
        ]
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

const createPost = (post, index) => {
    const postItem = document.createElement('a');
    postItem.className = 'posts__item';
    postItem.href = `./post.html?id=${index}`;
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

const renderPosts = (widthScreen) => {
    postsList.textContent = '';
    instagramPostsList.textContent = '';
    if(widthScreen > 768) {
        for (let i = 0; i < 4; i++) {
            postsList.append(createPost(postsArray[i], i));
        }
        if (widthScreen > 1200) {
            for (let i = 0; i < 4; i++) {
                instagramPostsList.append(createInstagramPost(instagramPostsArray[i]));
            }
        } else {
            for (let i = 0; i < 3; i++) {
                instagramPostsList.append(createInstagramPost(instagramPostsArray[i]));
            }
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
    renderPosts(widthScreen);
}

onload = mediaRequests();

