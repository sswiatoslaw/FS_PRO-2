import { Server } from "./main/classes.js";

const server = new Server();

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

const searchItem = (item) => {
    const searchItemWrapper = document.createElement('a');
    searchItemWrapper.classList.add("header__search-item");
    searchItemWrapper.href = `/product.html?id=${item.id}`;
    const searchItemImage = document.createElement("img");
    searchItemImage.src = item.data.images[0];
    searchItemImage.classList.add("header__search-item-image");
    const searchItemDetails = document.createElement("div");
    searchItemDetails.classList.add("header__search-details");
    const searchItemTitle = document.createElement("h3");
    searchItemTitle.textContent = item.name;
    const searchItemPrice = document.createElement("p");
    searchItemPrice.textContent = item.price;
    searchItemDetails.append(searchItemTitle, searchItemPrice);
    searchItemWrapper.append(searchItemImage, searchItemDetails);

    return searchItemWrapper
}

const searchInput = document.querySelector(".header__search");

searchInput.addEventListener('change', (event) => {
    const searchDropdown = document.querySelector('.header__search-dropdown');
    searchDropdown.innerHTML = "";
    if(event.target.value !== "") {
        searchDropdown.classList.remove('hidden');
        searchInput.classList.add('active');
        server.request(`products?q=${event.target.value}`).then((response) => {
            console.log(response);
            response.forEach((item) => {
                searchDropdown.append(searchItem(item));
            })
        })
    } else {
        searchDropdown.classList.add('hidden');
        searchInput.classList.remove('active');

    }
})
