class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(product) {
    this.items.push(product);
    this.renderSummary();
  }

  removeFromCart(product) {
    this.items = this.items.filter(x => x.id === product);
    this.renderSummary();
  }

  totalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  clear() {
    this.items = [];
    this.renderSummary();
  }

  renderSummary() {
    const summary = document.getElementById("cart-summary");
    if (!summary) return;

    summary.innerHTML = `
      <p>Товаров: ${this.items.length}</p>
      <p>Сумма: ${this.totalPrice()} грн</p>
      <button id="clear-cart">Очистить</button>
    `;

    document.getElementById("clear-cart").onclick = () => this.clear();
  }
}
