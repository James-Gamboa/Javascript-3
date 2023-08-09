async function fetchInventory(productType, itemId) {
  const response = await fetch(
    `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/${productType}/${itemId}`,
  );
  return response.json();
}

async function fetchPlantInfo(plantId) {
  const response = await fetch(
    `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${plantId}`,
  );
  return response.json();
}

export { fetchInventory, fetchPlantInfo };
