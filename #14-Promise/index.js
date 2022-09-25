const getRequest = (url) => {
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

const request = (method ,url, data = null) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url);

        request.onload = () => {
            console.log(request)
            if(request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Продукт не створився!'))
                console.log(request.error);
            }
        }

        request.send(data)
    })
}

// request("POST", 'https://dummyjson.com/products/add', JSON.stringify({title: 'DAN.IT Education'}))
//     .then((value) => {
//         console.log(value);
//     })
//     .catch((error) => {
//         console.log(error);
//     })

// request('DELETE', 'https://dummyjson.com/products/1')
//     .then((value) => {
//     console.log(value);
// })

// getRequest('https://dummyjson.com/products/1')
//     .then((value) => {
//         console.log(JSON.parse(value));
//     })
//     .catch((error) => {
//         console.log(error);
//     })

// const json = {
//     "name": "sviatoslav",
//     "city": "Kyiv",
//     "work": [
//         {
//             "company": "DAN.IT"
//         },
//         {
//             "company": 'PrivatBank'
//         }
//     ]
// }

// const newJSON = JSON.stringify(json);
//
// console.log(newJSON);
// console.log(JSON.parse(newJSON));



fetch('https://dummyjson.com/products/1').then(value => {
    console.log(value);
    return value.json()
}).then(value => {
    console.log(value);
})

const request1 = (method, url, body) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": 'application/json'
        },
        body: body
    }).then(value => {
        console.log(value);
        return value.json();
    })
}

request1('POST', 'https://dummyjson.com/products/add', JSON.stringify({title: 'DAN.IT'})).then(value => {
    console.log(value);
})

request1('PUT', 'https://dummyjson.com/products/1', JSON.stringify({title: 'DAN.IT'})).then(value => {
    console.log(value);
})

fetch('https://dummyjson.com/products/1', {method: 'DELETE'}).then((value) => {
    console.log(value);
    return value.json();
}).then(value => {
    console.log(value);
})
