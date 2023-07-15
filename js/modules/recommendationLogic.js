// @ts-nocheck
import { PlantBuilder } from "../modules/plantBuilder.js";
import { getPlantImageName, getExtraImageName } from "../utils/imageUtils.js";

function getPlantRecommendation() {
  const form = document.getElementById("plantForm");
  const placement = form.querySelector('input[name="placement"]:checked');
  const sunlight = form.querySelector('input[name="sunlight"]:checked');
  const pets = form.querySelector('input[name="pets"]:checked');
  const watering = form.querySelector('input[name="watering"]:checked');
  const style = form.querySelector('input[name="style"]:checked');
  const extras = Array.from(
    form.querySelectorAll('input[name="extras"]:checked'),
  ).map((input) => input.value);

  if (!placement || !sunlight || !pets || !watering || !style) {
    alert("Please complete the form before generating a recommendation.");
    return null;
  }

  let plantBuilder = new PlantBuilder();
  let plantName;

  switch (placement.value) {
    case "inside-indirect":
      plantBuilder.withName("Low Light Plants");
      break;
    case "inside-lot-indirect":
      plantBuilder.withName("Medium Light Plants");
      break;
    case "outside":
      plantBuilder.withName("Outdoor Plants");
      break;
  }

  switch (plantBuilder.properties.name) {
    case "Low Light Plants":
      if (watering.value === "overwater") {
        plantName = "Toxic Plant (Low Light)";
      } else {
        plantName = "Non-Toxic Plant (Low Light)";
      }
      break;
    case "Medium Light Plants":
      if (watering.value === "overwater") {
        plantName = "Toxic Plant (Medium Light)";
      } else {
        plantName = "Non-Toxic Plant (Medium Light)";
      }
      break;
    case "Outdoor Plants":
      if (pets.value === "no") {
        plantName = "Toxic Plant (Outdoor)";
      } else {
        plantName = "Non-Toxic Plant (Outdoor)";
      }
      break;
  }

  switch (sunlight.value) {
    case "yes":
      plantBuilder.withSoil("Composted Soil");
      break;
    case "no":
      plantBuilder.withSoil("Fertilized Soil");
      break;
  }

  switch (pets.value) {
    case "yes":
      plantBuilder.withPotMaterial("Non-Toxic Plant");
      break;
    case "no":
      plantBuilder.withPotMaterial("Toxic Plant");
      break;
  }

  switch (watering.value) {
    case "overwater":
      if (plantName.includes("Toxic")) {
        plantName += " (Low Light)";
      } else {
        plantName += " (Medium Light)";
      }
      plantBuilder
        .withPotMaterial("Clay")
        .withSoil("Drainage Soil")
        .withPlantImage(getPlantImageName(plantName));
      break;
    case "underwater":
    case "neither":
      plantBuilder.withPotMaterial("Ceramic");
      break;
  }

  switch (style.value) {
    case "minimalism":
      plantBuilder.withPotStyle("Simple");
      break;
    case "decoration":
      plantBuilder.withPotStyle("Simple").withPotStyle("decorated");
      break;
    case "bright-colors":
      plantBuilder.withPotStyle("Painted").withPotStyle("decorated");
      break;
  }

  plantBuilder
    .withPotColor("clay")
    .withExtras(extras.map((extra) => getExtraImageName(extra)));

  const plantResult = plantBuilder.build();
  return plantResult;
}

export { getPlantRecommendation };
