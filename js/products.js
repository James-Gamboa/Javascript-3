// @ts-nocheck
import { getRealPlantName } from "./utils/getNamePlantsUtils.js";
import { renderCustomizationPreview } from "./modules/renderCustomizationPreview.js";
import {
  checkStockAvailability,
  showAlertMessage,
} from "./utils/productUtils.js";

function renderProductView(customizationData) {
  const productView = document.getElementById("productView");
  productView.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `Product: ${getRealPlantName(customizationData.name)}`;
  productView.appendChild(title);

  renderCustomizationPreview(customizationData);

  const stockAvailability = checkStockAvailability(customizationData);

  if (stockAvailability === "in-stock") {
    showAlertMessage("In Stock", "green");
  } else if (stockAvailability === "limited-stock") {
    showAlertMessage(
      "One of the items in your order has limited stock. Order soon!",
      "yellow",
    );
  } else if (stockAvailability === "out-of-stock") {
    showAlertMessage(
      "One of the items in your order is out of stock. Please check the inventory alerts.",
      "red",
    );
  }

  const orderButton = document.getElementById("orderButton");
  orderButton.disabled = stockAvailability === "out-of-stock";

  const backButton = document.createElement("button");
  backButton.textContent = "Back to customization";
  backButton.addEventListener("click", function () {
    window.location.href = "customize.html";
  });
  productView.appendChild(backButton);
}

export { renderProductView };
