export function handleProductLinkClick(link, selectedJoke) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const type = link.dataset.type;
    const color = link.dataset.color;
    const url = `ecommerce.html?type=${type}&color=${color}&joke=${selectedJoke}`;
    window.location.href = url;
  });
}
