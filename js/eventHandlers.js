export function handleProductLinkClick(link) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const type = link.dataset.type;
    const color = link.dataset.color;
    const selectedJoke = link.dataset.joke || "";
    const urlParams = new URLSearchParams();
    urlParams.set("type", type);
    urlParams.set("color", color);
    urlParams.set("joke", selectedJoke);
    const newUrl = `ecommerce.html?${urlParams.toString()}`;
    window.location.href = newUrl;
  });
}
