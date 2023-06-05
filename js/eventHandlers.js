export function handleProductLinkClick(link) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const type = link.dataset.type;
    const color = link.dataset.color;
    const selectedJoke = link.dataset.joke || "";
    const url = `ecommerce.html?type=${type}&color=${color}&joke=${selectedJoke}`;
    window.location.href = url;
  });
}