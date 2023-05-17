//api
const urlApiImg =
  "https://shibe.online/api/shibes?count=5&urls=true&httpsUrls=true";

let allImg = [];
let imgGallery;

async function getImg() {
  try {
    let response = await fetch(urlApiImg);
    let data = await response.json();

    allImg = data;

    imgGallery = addImgGall(allImg);

    paintImgGallery();
  } catch (e) {
    console.log(e);
  }
}

getImg();

//creating gallery of img
const imgGallContainer = document.getElementById("img-gallery");

function addImgGall(imgUrlArray) {
  let imgUrl = "";

  for (const img of imgUrlArray) {
    imgUrl += `
    <div class="imgGall">
      <img src="${img}" />
    </div>
    `;
  }
  return imgUrl;
}

function paintImgGallery() {
  imgGallContainer.innerHTML = imgGallery;
}

//variables
let arrayProducts = allProducts.products;

const productContainer = document.getElementById("products-container");

const noResultsMssg = document.getElementById("no-results");

//creating cards of products
function addCards(productsParam) {
  let productsCards = "";

  if (productsParam.length != 0) {
    for (const product of productsParam) {
      productsCards += `
        <div class="shop-card" id="shop-element${product._id}">
          <img class="shopE-img" src="${product.image}" alt="${product.image}" />

          <div class="shopE-body">
            <p class="shopE-title">${product.name}</p>

            <p class="shopE-text">${product.description}</p>
          </div>

          <div class="shopE-footer">
            <p>$${product.price}</p>

            <a href="../pages/shop-detail.html?id=${product._id}" class="shopE-button-detail">Ver más</a>

            <a href="" class="shopE-button">Comprar</a>
          </div>
        </div>
    `;
    }
    noResultsMssg.innerHTML = ``;
  } else {
    noResultsMssg.innerHTML = `
    <div class="no-results">
      <h2>¡No se encontró ningún producto! Prueba con otra categoría o revisa la ortografía</h2>
      <img src="../assets/img/cat-error.png" alt="error cat">
    </div>
    `;
  }
  return productsCards;
}

let cards = addCards(arrayProducts);

function paintCards() {
  productContainer.innerHTML = cards;
}

//categories
let categories = [];

for (const cat of arrayProducts) {
  if (!categories.includes(cat.category)) {
    categories.push(cat.category);
  }
}

const categoriesContainer = document.getElementById("checkCat");

function createCategories(catCompositor) {
  let catProduct = "";

  for (const cat of catCompositor) {
    catProduct += `
    <label>
      <input
        type="checkbox"
        name="checkbox-cat"
        class="checkbox"
        id="${cat}"
        value="${cat}"
      />
      ${cat}
    </label>
    `;
  }
  return catProduct;
}

category = createCategories(categories);

categoriesContainer.innerHTML = category;

//categories filter
const catCheckBoxSelect = document.getElementById("checkCat");

let catCheckBoxArray = [];

catCheckBoxSelect.addEventListener("click", (e) => {
  if (e.target.checked != undefined) {
    if (e.target.checked) {
      catCheckBoxArray.push(e.target.value);
    } else {
      let index = catCheckBoxArray.indexOf(e.target.value);
      if (index != -1) {
        catCheckBoxArray.splice(index, 1);
      }
    }
    cards = [];
    createCheckedCat();
  }
});

catCheckBoxSelect.addEventListener("click", (e) => {
  if (!e.target.checked && catCheckBoxArray.length == 0) {
    cards = addCards(arrayProducts);
    paintCards();
  }
});

function catCheckCompositor(list, products) {
  let checkedCat = [];

  for (const e of products) {
    if (list.includes(e.category)) {
      checkedCat.push(e);
    }
  }
  return checkedCat;
}

function createCheckedCat() {
  if (catCheckBoxArray.length != 0) {
    cards = addCards(catCheckCompositor(catCheckBoxArray, arrayProducts));
    paintCards();
  }
}

//search filter input
const searchInput = document.getElementById("search");

function searchFilter(list, products) {
  let inputFilter = [];

  for (const e of products) {
    if (e.name.toLowerCase().includes(list)) {
      inputFilter.push(e);
    }
  }
  return inputFilter;
}

searchInput.addEventListener("keyup", () => {
  if (catCheckBoxArray.length != 0) {
    cards = addCards(
      searchFilter(
        searchInput.value.toLowerCase(),
        catCheckCompositor(catCheckBoxArray, arrayProducts)
      )
    );
    paintCards();
  } else {
    cards = addCards(
      searchFilter(searchInput.value.toLowerCase(), arrayProducts)
    );
    paintCards();
  }
});

//input button
const inputButton = document.getElementById("form-search-button");

function filterInputCardsButton() {
  if (catCheckBoxArray.length != 0) {
    cards = addCards(
      searchFilter(
        searchInput.value.toLowerCase(),
        catCheckCompositor(catCheckBoxArray, arrayProducts)
      )
    );
    paintCards();
  } else {
    cards = addCards(
      searchFilter(searchInput.value.toLowerCase(), arrayProducts)
    );
    paintCards();
  }
}

inputButton.addEventListener("click", (e) => {
  filterInputCardsButton();
});

//calling functions
paintCards();
