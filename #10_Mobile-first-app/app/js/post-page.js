const postComments = document.querySelector('.post__comments');

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

const createComment = (comment) => {
    const commentWrapper = document.createElement('div');
    commentWrapper.classList = 'post__comments-item';
    const userNameComment = document.createElement('h2');
    userNameComment.textContent = comment.name;
    const textComment = document.createElement('p');
    textComment.textContent = comment.text;

    commentWrapper.append(userNameComment);
    commentWrapper.append(textComment);

    return commentWrapper;
}

const renderComments = (index) => {
    const commentsList = postsArray[index].commentsList;
    commentsList.forEach((comment) => {
        postComments.append(createComment(comment));
    })
}

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('id'));

window.onload = renderComments(urlParams.get('id'));


