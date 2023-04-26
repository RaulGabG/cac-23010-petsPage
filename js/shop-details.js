//id connection
const queryStr = location.search;
const paramtrs = new URLSearchParams(queryStr);
const productId = paramtrs.get("id");

//variables
let arrayProducts = allProducts.products;

const productContainer = document.getElementById("products-details-container");

let prod = arrayProducts[productId - 1];

//creating card of product
productContainer.innerHTML = `
        <div class="shop-card shop-card-details" id="shop-element${prod._id}">
          <div class="shopE-img-details">
            <img src="${prod.image}" alt="${prod.image}" />
          </div>

          <div class="shopE-body-details-cont">
            <div class="shopE-body-details">
              <p class="shopE-title title-details">${prod.name}</p>

              <p class="shopE-text text-details">${prod.descripExt}</p>
            </div>

            <div class="shopE-footer-details">
              <p>$${prod.price}</p>

              <a href="" class="shopE-button">Comprar</a>
            </div>
          </div>
        </div>
    `;
