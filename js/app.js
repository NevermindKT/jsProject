const cart = new Cart();
const catalog = new ProductCatalog();

window.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    window.location.href = "register.html";
    return;
  }

  const nameEl = document.getElementById("user-name");
  if (nameEl) {
    nameEl.textContent = userData.username;
  }

  await loadProductsFromAPI();
  renderCatalog();
});

window.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    window.location.href = "register.html";
    return;
  }

  const nameEl = document.getElementById("user-name");
  if (nameEl) {
    nameEl.textContent = userData.username;
  }

  renderCatalog();
});

document.getElementById("search").addEventListener("input", (e) => {
  const target = e.target;

  if (!(target instanceof HTMLInputElement)) return;

  const query = target.value.toLowerCase();

  const filtered = catalog.getAllProducts().filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );

  renderCatalog(filtered);

});

document.getElementById("cart-button").addEventListener("click", () => {
  window.location.href = "cart.html";
});


function renderCatalog(productsToRender = catalog.getAllProducts()) {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    card.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}"><br>
      <p>${product.description}</p>
      <strong>${product.price} грн</strong><br>
      <button data-id="${product.id}">Добавить в корзину</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      e.stopPropagation();
      cart.addToCart(product);
    });

    container.appendChild(card);
  });
}

function setupCartSummary() {
  const container = document.querySelector(".main-layout-with-sidebar");
  if (!container) {
    console.warn("main-layout не найден");
    return;
  }

  const summary = document.createElement("div");
  summary.id = "cart-summary";
  summary.style.marginTop = "20px";

  container.appendChild(summary);
  cart.renderSummary();
}

async function loadProductsFromAPI() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    data.forEach(p => {

      const product = {
        id: p.id,
        name: p.title,
        price: p.price,
        description: p.description,
        image: p.image,
      };
      catalog.addProduct(product);
    });
  } catch (err) {
    console.error("Ошибка при загрузке товаров:", err);
  }
}
