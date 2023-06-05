export function handleProductLinkClick(link, selectedJokeId) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const type = link.dataset.type;
    const color = link.dataset.color;
    const urlParams = new URLSearchParams();
    urlParams.set("type", type);
    urlParams.set("color", color);
    urlParams.set("joke", selectedJokeId);
    const newUrl = `ecommerce.html?${urlParams.toString()}`;
    window.location.href = newUrl;
  });
}