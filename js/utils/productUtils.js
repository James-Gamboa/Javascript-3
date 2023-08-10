// @ts-nocheck
function checkStockAvailability(customizationData) {
  const extrasInStock = checkExtrasStock(customizationData.extras);
  const potStock = checkPotStock(
    customizationData.potMaterial,
    customizationData.potStyle,
    customizationData.potColor,
  );
  const plantStock = checkPlantStock(customizationData.name);

  if (extrasInStock && potStock && plantStock) {
    return "in-stock";
  } else if (!extrasInStock || !potStock || !plantStock) {
    return "out-of-stock";
  } else {
    return "limited-stock";
  }
}

function showAlertMessage(message, color) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.style.backgroundColor = color;
  alertDiv.textContent = message;

  const productView = document.getElementById("customizationPreview");
  if (productView) {
    productView.appendChild(alertDiv);
  }
}

function checkExtrasStock(selectedExtras) {
  return selectedExtras.every((extra) => isAvailableInStock(extra));
}

function checkPotStock(potMaterial, potStyle, potColor) {
  return isAvailableInStock(getPotIdentifier(potMaterial, potStyle, potColor));
}

function checkPlantStock(plantName) {
  return isAvailableInStock(plantName);
}

function isAvailableInStock(itemIdentifier) {
  const availableStock = {
    extra1: true,
    extra2: false,
  };
  return availableStock[itemIdentifier] || false;
}

function getPotIdentifier(potMaterial, potStyle, potColor) {
  return `${potMaterial}-${potStyle}-${potColor}`;
}

export { checkStockAvailability, showAlertMessage };
