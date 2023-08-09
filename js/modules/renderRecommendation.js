// @ts-nocheck
import { getRealPlantName } from "../utils/getNamePlantsUtils.js";
import {
  getPlantImageName,
  getPotImageName,
  getExtraImageName,
  getSoilImageName
} from "../utils/imageUtils.js";

function renderRecommendation(plant, container) {
  const recommendationContainer =
    container || document.getElementById("recommendation");
  recommendationContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = getRealPlantName(plant.name);
  recommendationContainer.appendChild(title);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const plantImage = document.createElement("img");
  plantImage.src = `Assets/${getPlantImageName(plant.name)}.png`;
  plantImage.alt = getRealPlantName(plant.name);
  imageContainer.appendChild(plantImage);

  if (plant.extras && plant.extras.length > 0) {
    for (const extra of plant.extras) {
      const extraImage = document.createElement("img");
      extraImage.src = `Assets/${getExtraImageName(extra)}.png`;
      extraImage.alt = extra;
      imageContainer.appendChild(extraImage);
    }
  }

  if (plant.potStyle) {
    const potImage = document.createElement("img");
    potImage.src = `Assets/${getPotImageName(
      plant.potMaterial,
      plant.potStyle
    )}.png`;
    potImage.alt = `${plant.potMaterial}`;
    imageContainer.appendChild(potImage);
  }

  const soilImage = document.createElement("img");
  soilImage.src = `Assets/soil-${getSoilImageName(plant.soil)}.png`; 
  soilImage.alt = `Soil: ${plant.soil}`;
  imageContainer.appendChild(soilImage);

  recommendationContainer.appendChild(imageContainer);

  const information = document.createElement("div");
  information.classList.add("information");

  const plantInfo = document.createElement("p");
  plantInfo.textContent = `Name: ${getRealPlantName(plant.name)}`;
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

  if (plant.extras && plant.extras.length > 0) {
    const extrasInfo = document.createElement("p");
    extrasInfo.textContent = `Extras: ${plant.extras.join(", ")}`;
    information.appendChild(extrasInfo);
  }

  recommendationContainer.appendChild(information);
}

export { renderRecommendation };
