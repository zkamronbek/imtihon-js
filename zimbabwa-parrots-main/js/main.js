const createElement = function (elName, className, textContent) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;

    if (textContent) {
        createdElement.textContent = textContent;
    }

    return createdElement
}



const template = document.querySelector("#template");
const renderParrots = function (product) {
    const { id, title, img, price, birthDate, } = product;
    const parrotsRow = template.content.cloneNode(true);

    parrotsRow.querySelector(".card-img-top").src = img;

    parrotsRow.querySelector(".card-title").textContent = title;

    parrotsRow.querySelector(".mark").textContent = price;
    parrotsRow.querySelector(".card-text").textContent = birthDate;
    parrotsRow.querySelector(".btn-success").setAttribute("data-id", id)
    parrotsRow.querySelector(".btn-secondary").setAttribute("data-id", id)
    parrotsRow.querySelector(".btn-danger").setAttribute("data-id", id)



    return parrotsRow
}

const productWrapper = document.querySelector(".parrots-wrapper");

const renderproduc = function (productArray = products) {
    productWrapper.innerHTML = "";

    for (let i = 0; i < productArray.length; i++) {
        const product = productArray[i];
        const newItem = renderParrots(product);
        productWrapper.append(newItem);
    }
}


for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const newItem = renderParrots(product);
    productWrapper.append(newItem);
}

const form = document.querySelector("#form");
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const parrotTitle = document.querySelector("#parrot-title");
    const parrotImg = document.querySelector("#parrot-img");
    const price = document.querySelector("#price");
    const parrotDate = document.querySelector("#parrot-date");
    const parrotWidth = document.querySelector("#parrot_width");
    const parrotHeight = document.querySelector("#parrot_height");
    const features = document.querySelector("#features");

    const parrotTitleValue = parrotTitle.value;
    const parrotImgValue = parrotImg.value;
    const priceValue = price.value;
    const parrotDateValue = parrotDate.value;
    const parrotWidthValue = parrotWidth.value;
    const parrotHeightValue = parrotHeight.value;
    const featuresValue = features.value;

    if (parrotTitleValue.trim() && parrotImgValue && priceValue.trim() && parrotDateValue.trim() && parrotWidthValue && parrotHeightValue && featuresValue.trim()) {
        const parrots = {
            title: parrotTitleValue,
            img: parrotImgValue,
            price: priceValue,
            birthDate: parrotDateValue,
            sizes: {
                width: parrotWidthValue,
                height: parrotHeightValue
            },
            isFavorite: false,
            features: "Beautiful,Tame,Can speak"
        }
        products.push(parrots);
        form.reset();
        localStorage.setItem("products", JSON.stringify(products));
        const newItem = renderParrots(parrots);
        productWrapper.append(newItem);
    }


})



productWrapper.addEventListener("click", function (evt) {
    //delet
    if (evt.target.matches(".btn-danger")) {
        const clickedItemId = +evt.target.dataset.id;
        const clickedItemIndex = products.findIndex(function (card) {
            return card.id === clickedItemId;
        });
        
        products.splice(clickedItemIndex, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderproduc();
    }
    //edit
    else if (evt.target.matches(".btn-secondary")) {
        const clickedId = +evt.target.dataset.id;
        const clicked = products.find(function (card) {
            return card.id === clickedId;
        });
        
        newProductTitle.value = clicked.title;
        newPrince.value = clicked.price;
        inputImg.value = clicked.img;
        form.setAttribute("data-editingid", clicked.id);
    }

});

const inputImg = document.querySelector("#parrot-img")
const newProductTitle = document.querySelector("#parrot-title");
const newPrince = document.querySelector("#price")













