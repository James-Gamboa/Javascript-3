// @ts-nocheck
import { PlantBuilder } from "../modules/plantBuilder.js";

function getPlantRecommendation() {
  const form = document.getElementById("plantForm");
  const placement = form.querySelector('input[name="placement"]:checked').value;
  const sunlight = form.querySelector('input[name="sunlight"]:checked').value;
  const pets = form.querySelector('input[name="pets"]:checked').value;
  const watering = form.querySelector('input[name="watering"]:checked').value;
  const style = form.querySelector('input[name="style"]:checked').value;
  const extras = Array.from(
    form.querySelectorAll('input[name="extras"]:checked'),
  ).map((input) => input.value);

  let plantBuilder = new PlantBuilder();

  switch (placement) {
    case "inside-indirect":
      plantBuilder = plantBuilder.withName("Low Light Plant");
      break;
    case "inside-lot-indirect":
      plantBuilder = plantBuilder.withName("Medium Light Plant");
      break;
    case "outside":
      plantBuilder = plantBuilder.withName("Outdoor Plant");
      break;
  }

  switch (sunlight) {
    case "yes":
      plantBuilder = plantBuilder.withSoil("Composted Soil");
      break;
    case "no":
      plantBuilder = plantBuilder.withSoil("Fertilized Soil");
      break;
  }

  switch (pets) {
    case "yes":
      plantBuilder = plantBuilder.withName("Non-Toxic Plant");
      break;
    case "no":
      plantBuilder = plantBuilder.withName("Toxic Plant");
      break;
  }

  switch (watering) {
    case "overwater":
      plantBuilder = plantBuilder
        .withPotMaterial("Clay")
        .withSoil("Drainage Soil");
      break;
    case "underwater":
    case "neither":
      plantBuilder = plantBuilder.withPotMaterial("Ceramic");
      break;
  }

  switch (style) {
    case "minimalism":
      plantBuilder = plantBuilder.withPotStyle("Simple");
      break;
    case "decoration":
      plantBuilder = plantBuilder
        .withPotStyle("Simple")
        .withPotStyle("decorated");
      break;
    case "bright-colors":
      plantBuilder = plantBuilder
        .withPotStyle("Painted")
        .withPotStyle("decorated");
      break;
  }

  plantBuilder = plantBuilder.withPotColor("clay").withExtras(extras);

  const plantResult = plantBuilder.build();
  return plantResult;
}

export { getPlantRecommendation };
