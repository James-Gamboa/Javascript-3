// @ts-nocheck
import { prices } from "./customizationProduct.js";

function renderPriceBreakdown(customizationData, inventoryResults, totalPrice) {
  const priceBreakdownContainer = document.getElementById(
    "priceBreakdownContainer",
  );

  priceBreakdownContainer.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Price Breakdown";
  priceBreakdownContainer.appendChild(heading);

  const list = document.createElement("ul");

  customizationData.extras.forEach((extra) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${extra}: $${prices[extra].toFixed(2)}`;
    list.appendChild(listItem);
  });

  const soilItem = document.createElement("li");
  soilItem.textContent = `Soil: $${prices[customizationData.soil].toFixed(2)}`;
  list.appendChild(soilItem);

  const potMaterialItem = document.createElement("li");
  potMaterialItem.textContent = `Pot Material: $${prices[
    customizationData.potMaterial
  ].toFixed(2)}`;
  list.appendChild(potMaterialItem);

  const potStyleItem = document.createElement("li");
  potStyleItem.textContent = `Pot Style: $${prices[
    customizationData.potStyle
  ].toFixed(2)}`;
  list.appendChild(potStyleItem);

  const potColorItem = document.createElement("li");
  potColorItem.textContent = `Pot Color: $${prices[
    customizationData.potColor
  ].toFixed(2)}`;
  list.appendChild(potColorItem);

  const plantItem = document.createElement("li");
  const plant = inventoryResults.find(
    (item) => item.name === customizationData.name,
  );
  if (plant) {
    plantItem.textContent = `${plant.name}: $${prices[plant.name].toFixed(2)}`;
  }
  list.appendChild(plantItem);

  const totalItem = document.createElement("li");
  totalItem.textContent = `Total: $${totalPrice.toFixed(2)}`;
  totalItem.style.fontWeight = "bold";
  list.appendChild(totalItem);

  priceBreakdownContainer.appendChild(list);
}

function renderInventoryAlerts(inventoryResults) {
  const inventoryAlertsContainer = document.getElementById(
    "inventoryAlertsContainer",
  );

  inventoryAlertsContainer.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Inventory Alerts";
  inventoryAlertsContainer.appendChild(heading);

  const list = document.createElement("ul");

  for (const item in inventoryResults) {
    if (inventoryResults[item].stock < 5) {
      const listItem = document.createElement("li");
      listItem.textContent = `${item} is low in stock (${inventoryResults[item].stock} left)`;
      listItem.style.color = "red";
      list.appendChild(listItem);
    }
  }

  inventoryAlertsContainer.appendChild(list);
}

export { renderPriceBreakdown, renderInventoryAlerts };
