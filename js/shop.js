//variables
let arrayProducts = allProducts.products;

const productContainer = document.getElementById("products-container");

//creating cards of products
function addCards(productsParam) {
  let productsCards = "";
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
  return productsCards;
}

let cards = addCards(arrayProducts);

function paintCards() {
  productContainer.innerHTML = cards;
}

//calling functions
paintCards();
