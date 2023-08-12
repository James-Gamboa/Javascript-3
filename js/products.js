// @ts-nocheck
import { getRealPlantName } from "./utils/getNamePlantsUtils.js";
import { renderCustomizationPreview } from "./modules/renderCustomizationPreview.js";
import {
  checkStockAvailability,
  showAlertMessage,
} from "./utils/productUtils.js";
import {
  renderPriceBreakdown,
  renderInventoryAlerts,
} from "./modules/accordions.js";
import {
  renderCareTips,
  renderPlantDescription,
} from "./utils/plantDetails.js";

document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-btn");
  accordionButtons.forEach((button) => {
    button.addEventListener("click", toggleAccordion);
  });
});

function toggleAccordion(event) {
  const accordionButton = event.target;
  const accordionContent = accordionButton.nextElementSibling;

  const allAccordions = document.querySelectorAll(".accordion-content");
  allAccordions.forEach((content) => {
    if (content !== accordionContent) {
      content.style.display = "none";
    }
  });

  if (accordionContent.style.display === "block") {
    accordionContent.style.display = "none";
  } else {
    accordionContent.style.display = "block";

    if (accordionButton.id === "priceBreakdownBtn") {
      renderPriceBreakdown();
    } else if (accordionButton.id === "inventoryAlertsBtn") {
      renderInventoryAlerts();
    } else if (accordionButton.id === "plantDescriptionBtn") {
      renderPlantDescription();
    } else if (accordionButton.id === "careTipsBtn") {
      renderCareTips();
    }
  }
}

function getCustomizationData() {
  const customizationData = JSON.parse(
    sessionStorage.getItem("customizationData"),
  );
  return customizationData || null;
}

function renderProductView(customizationData) {
  const customizationPreview = document.getElementById("customizationPreview");
  customizationPreview.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `Product: ${getRealPlantName(customizationData.name)}`;
  customizationPreview.appendChild(title);

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

  const orderButton = document.getElementById("orderNowBtn");
  orderButton.disabled = stockAvailability === "out-of-stock";

  const backButton = document.createElement("button");
  backButton.textContent = "Back to customization";
  backButton.id = "backToCustomizationBtn";
  backButton.addEventListener("click", function () {
    window.location.href = "customize.html";
  });
  customizationPreview.appendChild(backButton);
}

const customizationData = getCustomizationData();
if (customizationData) {
  renderProductView(customizationData);
}
