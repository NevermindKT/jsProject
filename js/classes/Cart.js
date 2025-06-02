class Cart {
  constructor() {
    this.items = this.loadFromCookie();
    this.renderSummary();
  }

  addToCart(product) {
    this.items.push(product);
    this.saveToCookie();
    this.renderSummary();
  }

  removeFromCart(productId) {
    this.items = this.items.filter(x => x.id !== productId);
    this.saveToCookie();
    this.renderSummary();
  }

  totalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  clear() {
    this.items = [];
    this.saveToCookie();
    this.renderSummary();
  }

  getItems() {
    return this.items;
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

  saveToCookie() {
    const minimalItems = this.items.map(({id, name, price}) => ({id, name, price}));
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(minimalItems))}; path=/; max-age=2592000`;
  }

  loadFromCookie() {
    const cookieStr = document.cookie.split('; ').find(row => row.startsWith('cart='));
    if (!cookieStr) return [];
    try {
      return JSON.parse(decodeURIComponent(cookieStr.split('=')[1]));
    } catch {
      return [];
    }
  }
}
