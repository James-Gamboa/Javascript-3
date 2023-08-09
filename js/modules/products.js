// @ts-nocheck
import { getRealPlantName } from "../utils/getNamePlantsUtils.js";
import { renderCustomizationPreview } from "./renderCustomizationPreview.js";
import { checkStockAvailability } from "../utils/productUtils.js";

function renderProductView(customizationData) {
  const productView = document.getElementById("productView");
  productView.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `Product: ${getRealPlantName(customizationData.name)}`;
  productView.appendChild(title);

  renderCustomizationPreview(customizationData);

  const stockAvailability = checkStockAvailability(customizationData);

  const orderButton = document.getElementById("orderNowBtn");
  orderButton.disabled = stockAvailability === "out-of-stock";

  if (stockAvailability === "out-of-stock") {
    const availabilityAlert = document.getElementById("availabilityAlert");
    availabilityAlert.textContent =
      "One of the items in your order is out of stock. Please check the inventory alerts.";
    availabilityAlert.style.backgroundColor = "red";
  } else {
    const availabilityAlert = document.getElementById("availabilityAlert");
    availabilityAlert.textContent = "";
    availabilityAlert.style.backgroundColor = "";
  }

  const backButton = document.createElement("button");
  backButton.textContent = "Back to customization";
  backButton.addEventListener("click", function () {
    window.location.href = "customize.html";
  });
  productView.appendChild(backButton);
}

export { renderProductView };
