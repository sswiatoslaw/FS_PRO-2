const previewProductBlock = (item) => {
    console.log(item);
    const previewProductWrapper = document.createElement('a');
    previewProductWrapper.classList.add("header__search-item");
    previewProductWrapper.href = `/product.html?id=${item.id}`;
    const previewProductImage = document.createElement("img");
    previewProductImage.src = item.data ? item.data.images[0] : item.image;
    previewProductImage.classList.add("header__search-item-image");
    const previewProductDetails = document.createElement("div");
    previewProductDetails.classList.add("header__search-details");
    const previewProductTitle = document.createElement("h3");
    previewProductTitle.textContent = item.name;
    const previewProductPrice = document.createElement("p");
    previewProductPrice.textContent = `${item.price} $`;
    previewProductDetails.append(previewProductTitle, previewProductPrice);
    previewProductWrapper.append(previewProductImage, previewProductDetails);

    return previewProductWrapper
}

export { previewProductBlock }