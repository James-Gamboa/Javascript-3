// @ts-nocheck
import { CustomizationObserver } from "./customizationObserver.js";
import {
  getPlantImageName,
  getPotImageName,
  getSoilImageName,
} from "../utils/imageUtils.js";
import { getRealPlantName } from "../utils/getNamePlantsUtils.js";

const customizationPreview = document.getElementById("customizationPreview");

function renderCustomizationPreview(plant) {
  customizationPreview.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = getRealPlantName(plant.name);
  customizationPreview.appendChild(title);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const plantImage = document.createElement("img");
  plantImage.src = `Assets/${getPlantImageName(plant.name)}.png`;
  plantImage.alt = plant.name;
  imageContainer.appendChild(plantImage);

  const soilImage = document.createElement("img");
  soilImage.src = `Assets/${getSoilImageName(plant.soil)}.png`;
  soilImage.alt = plant.soil;
  imageContainer.appendChild(soilImage);

  if (plant.extras.length > 0) {
    for (const extra of plant.extras) {
      const extraImage = document.createElement("img");
      extraImage.src = `Assets/${extra}.png`;
      extraImage.alt = extra;
      imageContainer.appendChild(extraImage);
    }
  }

  if (plant.potStyle) {
    const potImage = document.createElement("img");
    potImage.src = `Assets/${getPotImageName(
      plant.potMaterial,
      plant.potStyle,
    )}.png`;
    potImage.alt = `${plant.potMaterial}`;
    imageContainer.appendChild(potImage);
  }

  customizationPreview.appendChild(imageContainer);

  const information = document.createElement("div");
  information.classList.add("information");

  const plantInfo = document.createElement("p");
  plantInfo.textContent = `Name: ${plant.name}`;
  information.appendChild(plantInfo);

  const soilInfo = document.createElement("p");
  soilInfo.textContent = `Soil: ${plant.soil}`;
  information.appendChild(soilInfo);

  const potInfo = document.createElement("p");
  potInfo.textContent = `Pot Material: ${plant.potMaterial}`;
  information.appendChild(potInfo);

  const colorInfo = document.createElement("p");
  colorInfo.textContent = `Pot Color: ${plant.potColor}`;
  information.appendChild(colorInfo);

  if (plant.extras.length > 0) {
    const extrasInfo = document.createElement("p");
    extrasInfo.textContent = `Extras: ${plant.extras.join(", ")}`;
    information.appendChild(extrasInfo);
  }

  customizationPreview.appendChild(information);
}

const customizationObserver = new CustomizationObserver();
customizationObserver.subscribe({ update: renderCustomizationPreview });

export { renderCustomizationPreview };
