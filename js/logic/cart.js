if (!window.cart) {
  window.cart = new Cart();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.endsWith("cart.html")) return;

  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const buyBtn = document.getElementById("buy-button");
  const clearBtn = document.getElementById("clear-cart");

  clearBtn.onclick = () => {
    cart.clear();
    container.innerHTML = "Корзина пуста.";
    totalEl.textContent = "";
  };


  const items = cart.getItems();
  if (items.length === 0) {
    container.textContent = "Корзина пуста.";
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${item.name}</strong> — ${item.price} грн`;
    container.appendChild(div);
  });

  totalEl.textContent = `Общая сумма: ${cart.totalPrice().toFixed(2)} грн`;

  buyBtn.onclick = () => {
    alert("Покупка совершена!");
    cart.clear();
    location.reload();
  };

  clearBtn.onclick = () => {
    cart.clear();
    location.reload();
  };
});
