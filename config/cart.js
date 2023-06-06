class Cart {
  constructor() {
    this.products = [];
  }

  addToCart(product) {
    this.products.push(product);
    this.updateCartList();
  }

  removeFromCart(index) {
    this.products.splice(index, 1);
    this.updateCartList();
  }

  removeAllFromCart() {
    this.products = [];
    this.updateCartList();
  }

  createMarkup() {
    let markup = "";

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      const productMarkup = product.createMarkup(i);
      markup += productMarkup;
    }

    return markup;
  }

  updateCartList() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = this.createMarkup();

    const removeButtons = document.getElementsByClassName("remove-product");
    for (let i = 0; i < removeButtons.length; i++) {
      const button = removeButtons[i];
      button.addEventListener("click", () => this.removeFromCart(i));
    }
  }
  
  clearCart() {
    this.products = [];
    this.updateCartList();
  }
}

export default Cart;