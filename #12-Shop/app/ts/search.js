import { previewProductBlock } from '../js/modules/productModule.js';
import { Server } from "../js/pages/main/classes.js";
const server = new Server();
const searchInput = document.querySelector(".header__search");
if (searchInput) {
    searchInput.addEventListener('change', (event) => {
        const searchDropdown = document.querySelector('.header__search-dropdown');
        const changeEvent = event.target;
        if (searchDropdown) {
            searchDropdown.innerHTML = "";
            if (changeEvent.value !== "") {
                searchDropdown.classList.remove('hidden');
                searchInput.classList.add('active');
                server.request(`products?q=${changeEvent.value}`).then((response) => {
                    response.forEach((item) => {
                        searchDropdown.append(previewProductBlock(item));
                    });
                });
            }
            else {
                searchDropdown.classList.add('hidden');
                searchInput.classList.remove('active');
            }
        }
    });
}
