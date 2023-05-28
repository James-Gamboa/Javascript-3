class Product {
  constructor(title, color, price, joke, image) {
    this.title = title;
    this.color = color;
    this.price = price;
    this.joke = joke;
    this.image = image;
  }

  createMarkup(index) {
    return `
      <div class="cart-product">
        <img src="${this.image}" alt="Product Image" /> 
        <p>${this.title} - Color: ${this.color}</p>
        <p>Precio: ${this.price}</p>
        <p>Chiste: ${this.joke}</p>
        <button class="remove-product" data-index="${index}">Remover</button>
      </div>
    `;
  }
}

export default Product;