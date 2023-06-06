function getUrlParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  return params;
}

function preselectProducts() {
  const params = getUrlParams();
  const type = params.type || null;
  const color = params.color || 'white';
  const joke = params.joke ? decodeURIComponent(params.joke) : '';

  const cartBtn = document.getElementById('open-cart-btn');
  cartBtn.addEventListener('click', function() {
    const url = `ecommerce.html?type=${type}&color=${color}&joke=${encodeURIComponent(joke)}`;
    window.location.href = url;
  });
}

window.addEventListener('DOMContentLoaded', function() {
  preselectProducts();
});
