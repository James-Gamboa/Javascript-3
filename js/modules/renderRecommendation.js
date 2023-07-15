// @ts-nocheck
import {
  getPlantImageName,
  getPotImageName,
  getExtraImageName,
} from "../utils/imageUtils.js";

function renderRecommendation(plant) {
  const recommendationContainer = document.getElementById("recommendation");
  recommendationContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = plant.name;
  recommendationContainer.appendChild(title);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const plantImage = document.createElement("img");
  plantImage.src = `img/${getPlantImageName(plant.name)}.png`; 
  plantImage.alt = plant.name; 
  imageContainer.appendChild(plantImage);

  if (plant.extras.length > 0) {
    for (const extra of plant.extras) {
      const extraImage = document.createElement("img");
      extraImage.src = `img/${getExtraImageName(extra)}.png`;
      extraImage.alt = extra;
      imageContainer.appendChild(extraImage);
    }
  }
  
  if (plant.potStyle) {
    const potImage = document.createElement("img");
    potImage.src = `img/${getPotImageName(
      plant.potMaterial,
      plant.potStyle
    )}.png`;
    potImage.alt = `${plant.potMaterial} pot`;
    imageContainer.appendChild(potImage);
  }

  recommendationContainer.appendChild(imageContainer);

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

  if (plant.extras.length > 0) { // Utiliza plant.extras en lugar de plant.properties.extras
    const extrasInfo = document.createElement("p");
    extrasInfo.textContent = `Extras: ${plant.extras.join(", ")}`;
    information.appendChild(extrasInfo);
  }

  recommendationContainer.appendChild(information);
}

export { renderRecommendation };