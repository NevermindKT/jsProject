const cart = new Cart();
const catalog = new ProductCatalog();

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
});



catalog.addProduct(new Product(1, "Кофе", 150, "100% арабика"));
catalog.addProduct(new Product(2, "Чай", 90, "Зеленый с жасмином"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));
catalog.addProduct(new Product(3, "Мёд", 250, "Натуральный цветочный"));

function renderCatalog() {
  const container = document.getElementById("catalog");
  catalog.getAllProducts().forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>${product.price} грн</strong><br>
      <button data-id="${product.id}">Добавить в корзину</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      cart.addToCart(product);
    });

    container.appendChild(card);
  });
}

function setupCartSummary() {
  const summary = document.createElement("div");
  summary.id = "cart-summary";
  summary.style.marginTop = "20px";
  document.querySelector(".main-layout").appendChild(summary);
  cart.renderSummary();
}

window.onload = () => {
  renderCatalog();
  setupCartSummary();
};
