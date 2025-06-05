document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<p>Товар не найден</p>";
    return;
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.title;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = `Цена: $${product.price.toFixed(2)}`;

    const cartBtn = document.getElementById("add-to-cart");
    cartBtn.addEventListener("click", () => {
      window.cart.add({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      });
    });
  } catch (err) {
    console.error("Ошибка загрузки товара:", err);
  }
});
