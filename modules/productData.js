export const products = {
  shirt: {
    white: {
      image: "product-shirt-white.jpg",
      title: "Camisa Blanca",
      price: "$10",
    },
    black: {
      image: "product-shirt-black.jpg",
      title: "Camisa Negra",
      price: "$13",
    },
  },
  case: {
    white: {
      image: "product-case-white.jpg",
      title: "Estuche de Celular Blanco",
      price: "$5",
    },
    black: {
      image: "product-case-black.jpg",
      title: "Estuche de Celular Negro",
      price: "$7",
    },
  },
  poster: {
    white: {
      image: "product-poster-white.jpg",
      title: "Poster Blanco",
      price: "$3",
    },
    black: {
      image: "product-poster-black.jpeg",
      title: "Poster Negro",
      price: "$5",
    },
  },
  pillow: {
    white: {
      image: "product-pillow-white.jpg",
      title: "Almohada Blanca",
      price: "$12",
    },
    black: {
      image: "product-pillow-black.jpg",
      title: "Almohada Negra",
      price: "$15",
    },
  },
};

export function getProductByTypeAndColor(type, color) {
  return products?.[type]?.[color] || null;
}