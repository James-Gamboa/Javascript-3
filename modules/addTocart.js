export function addToCartClicked(cart, createProductObject, updateCartList, saveCartToLocalStorage) {
  return function () {
    const product = createProductObject();
    product.id = cart.products.length;
    cart.addToCart(product);

    const productImage = document.getElementById("product-image");
    const productImagePath = productImage.getAttribute("src");
    product.image = productImagePath;

    updateCartList(cart, saveCartToLocalStorage);
    saveCartToLocalStorage(cart);
  };
}