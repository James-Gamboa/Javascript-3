// @ts-nocheck
import { Middleware } from "./middleware.js";
import { renderPriceBreakdown, renderInventoryAlerts } from "./accordions.js";
import {
  renderPlantDescription,
  renderCareTips,
} from "../utils/plantDetails.js";

const prices = {
  aglaonema: 12.99,
  aloe: 5.25,
  fern: 10.25,
  cactus: 8.25,
  monstera: 18.0,
  peaceLily: 8.75,
  sansevieria: 5.75,
  "clay-simple-unpainted": 3.0,
  "clay-simple-blue": 4.0,
  "clay-simple-pink": 4.0,
  "clay-simple-green": 4.0,
  "clay-simple-purple": 4.0,
  "clay-decorated-unpainted": 5.0,
  "clay-decorated-blue": 6.0,
  "clay-decorated-pink": 6.0,
  "clay-decorated-green": 6.0,
  "clay-decorated-purple": 6.0,
  "ceramic-simple-unpainted": 5.0,
  "ceramic-simple-blue": 6.0,
  "ceramic-simple-pink": 6.0,
  "ceramic-simple-green": 6.0,
  "ceramic-simple-purple": 6.0,
  "ceramic-decorated-unpainted": 7.0,
  "ceramic-decorated-blue": 8.0,
  "ceramic-decorated-pink": 8.0,
  "ceramic-decorated-green": 8.0,
  "ceramic-decorated-purple": 8.0,
  composted: 3.25,
  fertilized: 5.0,
  drainage: 5.5,
  "moss-pole": 2.25,
  pebbles: 2.0,
  "mini-plants": 3.75,
};

async function updateFormWithInventoryData() {
  const customizationData = JSON.parse(
    sessionStorage.getItem("customizationData")
  );

  try {
    const middleware = new Middleware(customizationData);
    await middleware.fetchInventoryData();
    await middleware.fetchPlantInfo();

    const priceTotal = calculatePriceTotal(
      customizationData,
      middleware.inventoryResults
    );
    renderPriceBreakdown(
      customizationData,
      middleware.inventoryResults,
      priceTotal
    );
    renderPlantDescription(middleware.plantInfo);
    renderCareTips(middleware.plantInfo);

    const stockAlert = generateInventoryAlerts(middleware.inventoryResults);
    if (stockAlert) {
      const availabilityAlert = document.getElementById("availabilityAlert");
      availabilityAlert.textContent = stockAlert;
      availabilityAlert.style.backgroundColor = "red";
      document.getElementById("orderNowBtn").disabled = true;
      renderInventoryAlerts(middleware.inventoryResults);
    } else {
      const availabilityAlert = document.getElementById("availabilityAlert");
      availabilityAlert.textContent = "";
      availabilityAlert.style.backgroundColor = "";
      document.getElementById("orderNowBtn").disabled = false;
      renderInventoryAlerts(middleware.inventoryResults);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function calculatePriceTotal(customizationData, inventoryResults) {
  let totalPrice = 0;

  customizationData.extras.forEach((extra) => {
    totalPrice += prices[extra];
  });

  totalPrice +=
    prices[customizationData.soil] +
    prices[customizationData.potMaterial] +
    prices[customizationData.potStyle] +
    prices[customizationData.potColor];

  const plantItem = inventoryResults.find(
    (item) => item.name === customizationData.name
  );
  if (plantItem) {
    totalPrice += prices[plantItem.name];
  }

  return totalPrice;
}

function generateInventoryAlerts(inventoryResults) {
  let stockAlertMessage = null;
  for (const item of inventoryResults) {
    if (item.stock < 5) {
      const alertMessage = `Low stock for ${item.name}. Only ${item.stock} left.`;
      if (!stockAlertMessage) {
        stockAlertMessage = alertMessage;
      } else {
        stockAlertMessage += `\n${alertMessage}`;
      }
    }
  }

  return stockAlertMessage;
}

export { updateFormWithInventoryData, generateInventoryAlerts, prices };
