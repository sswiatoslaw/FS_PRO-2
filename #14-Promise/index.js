const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url);

        request.onload = () => {
            if(request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Помилка!'))
            }
        }

        request.send();
    })
}

loadImage('https://dummyjson.com/products/1')
    .then((value) => {
        console.log(JSON.parse(value));
    })
    .catch((error) => {
        console.log(error);
    })
