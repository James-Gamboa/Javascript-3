export function openCartButtonClicked(cartContainer) {
  return function () {
    cartContainer.style.display = "block";
  };
}